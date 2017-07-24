
import http from 'http';
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

function returnPromise(req) {
  return new Promise((resolve, reject)=>{
    resolve({result :true});
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
      return returnPromise(request(config));
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
