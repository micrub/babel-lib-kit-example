
import http from 'http';
import Utils from './Utils';
import HttpClientErrors from './HttpClientErrors';
import { parse as urlParse } from 'url';;
import isURL from 'validator/lib/isURL';

const dbg = Utils.dbg(__filename);
let errors = HttpClientErrors;

const request = http.get;

let urlValidationOptions = {protocols: ['http', 'https'],
  require_protocol:true};

function returnPromise(config) {

  return new Promise((resolve, reject)=>{
    let req = request(config, (response) => {
      let statusCode = response.statusCode;
      let location = response.headers.location;
      if (statusCode < 200) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      } else if (statusCode >= 200 && statusCode < 299){
        let body = [];
        response.on('data', (chunk) => body.push(chunk));
        response.on('end', () => resolve(body.join('')));
      } else if (response.statusCode >= 300 && response.statusCode < 400 ) {
        let timeoutTimer;
        if (config.maxRedirects) {
          if (location && isURL(location)) {
            let redirectCount = 0;
            if (config.redirectCount === null) {
              redirectCount = 1;
            }else{
              redirectCount = redirectCount + 1;
            }
            if (redirectCount >= config.maxRedirects) {
              reject(new Error('Maximum redirects limit reached: ' + redirectCount + ' out of ' + config.maxRedirects));
            }else{
              if (config.timeout && !timeoutTimer) {
                //TODO fix time usage
                timeoutTimer = setTimeout(function () {
                  req.abort()
                  reject(new errors.TimeoutError())
                }, config.timeout)
              }
              resolve(get(location, redirectCount))
            }
          }else{
            reject(new Error('Not redirecting to invalid location : ' + location));
          }
        }else{
          resolve(get(location))
        }
      } else {
        if (statusCode === 404) {
          location = location || config.href || 'UNDEtected';
          reject(new errors.HttpNotFoundError(location));
        } else {
          reject(new Error('Http status code: ' + statusCode));
        }
      }
    })
    // Set additional timeout on socket - in case if remote
    // server freeze after sending headers
    if (config.timeout) { // only works on node 0.6+
      req.setTimeout(config.timeout, function () {
        if (req) {
          req.abort()
          reject(new errors.SocketTimeoutError())
        }
      })
    }
    req.on('error', (err) => {
      reject(err);
    })
    req.end();
  })
}

function get(url, isRedirect = null) {
  if (typeof url === 'string' && url.length) {
    if (!isURL(url, urlValidationOptions)) {
      return new errors.InvalidUrlError(url)
    } else {
      const parsedUrl = urlParse(url);
      const defaults = { method: 'get', timeout: 1000, maxRedirects: 5 };
      let redirectCount = null;
      if (isRedirect !== null) {
        redirectCount = isRedirect;
      }
      const config = { ...defaults, ...parsedUrl, redirectCount };
      return returnPromise(config);
    }
  } else {
    return new errors.EmptyUrlError();
  }
}


const HttpClient = { get, errors, request };

export default HttpClient;
