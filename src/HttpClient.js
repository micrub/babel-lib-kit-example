
import http from 'http';
import Utils from './Utils';
import { parse as urlParse } from 'url';;
import isURL from 'validator/lib/isURL';
import { inherits } from 'util';

const request = http.get;

let urlValidationOptions = {protocols: ['http', 'https'],
  require_protocol:true};

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

function hasHeader(header,headers) {
  return headers.includes(header)
}

function returnPromise(config) {
  return new Promise((resolve, reject)=>{
    let req = request(config, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      } else if (response.statusCode >= 300 && response.statusCode < 400 && hasHeader('location', response.headers)) {
        //let location = response.headers[hasHeader('location', response.headers)]

        //if (self.followAllRedirects) {
          //redirectTo = location
        //} else if (self.followRedirect) {
          //switch (self.method) {
            //case 'PATCH':
              //case 'PUT':
              //case 'POST':
              //case 'DELETE':
              //// Do not follow redirects
              //break
            //default:
              //redirectTo = location
            //break
          //}
        //}
      }
      if (redirectTo) {
      }
      let body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    })
    req.on('error', (err) => {
      reject(error);
    })
    req.end();
  })
}

function get(url) {
  if (typeof url === 'string' && url.length) {
    if (!isURL(url, urlValidationOptions)) {
      return new InvalidUrlError(url)
    } else {
      const parsedUrl = urlParse(url);
      const defaults = { method: 'get', timeout: 1000 };
      const config = { ...defaults, ...parsedUrl };
      return returnPromise(config);
    }
  } else {
    return new EmptyUrlError();
  }
}

let errors = {InvalidUrlError, EmptyUrlError};
for (var prop in errors) {
  let errorFnk = errors[prop];
  inherits(errorFnk, Error);
}

const HttpClient = { get, errors, request };

export default HttpClient;
