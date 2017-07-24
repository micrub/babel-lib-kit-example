
import http from 'http';
import Utils from './Utils';
import { parse as urlParse } from 'url';;
import isURL from 'validator/lib/isURL';
import { inherits } from 'util';

const dbg = Utils.dbgFactory(__filename);

const request = http.get;

let urlValidationOptions = {protocols: ['http', 'https'],
  require_protocol:true};

function NotFoundError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = 'Passed url not found: 404 ' + message;
  this.extra = extra;
};
function InvalidUrlError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = 'Passed url must be valid :' + message;
  this.extra = extra;
};
function EmptyUrlError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = 'Url must be NON empty string.';
  this.extra = extra;
};

let errors = {InvalidUrlError, EmptyUrlError, NotFoundError};

for (var prop in errors) {
  let errorFnk = errors[prop];
  inherits(errorFnk, Error);
}

function hasHeader(header,headers) {
  return headers.includes(header)
}

function returnPromise(config) {

  return new Promise((resolve, reject)=>{
    let req = request(config, (response) => {
      let statusCode = response.statusCode;
      if (statusCode < 200) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      } else if (statusCode >= 200 && statusCode < 299){
        let body = [];
        response.on('data', (chunk) => body.push(chunk));
        response.on('end', () => resolve(body.join('')));
      } else if (response.statusCode >= 300 && response.statusCode < 400 ) {
        if (config.maxRedirects) {
          let location = response.headers.location;
          if (location && isURL(location)) {
            let redirectCount = 0;
            if (config.redirectCount === null) {
              redirectCount = 1;
            }else{
              redirectCount = redirectCount + 1;
            }
            //dbg(location, redirectCount ,maxRedirects);
            if (redirectCount >= config.maxRedirects) {
              reject(new Error('Maximum redirects limit reached: ' + redirectCount + ' out of ' + config.maxRedirects));
            }else{
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
          reject(new NotFoundError(location, response.body));
        } else {
          reject(new Error('Http status code: ' + statusCode));
        }
      }
    })
    req.on('error', (err) => {
      reject(err);
    })
    req.end();
  })
}

function get(url, isRedirect = null) {
  if (typeof url === 'string' && url.length) {
    if (!isURL(url, urlValidationOptions)) {
      return new InvalidUrlError(url)
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
    return new EmptyUrlError();
  }
}


const HttpClient = { get, errors, request };

export default HttpClient;
