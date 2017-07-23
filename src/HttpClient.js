import request from 'request-promise-native';
import isURL from 'validator/lib/isURL';

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

function get(url) {
  if (typeof url === 'string' && url.length) {
    if (!isURL(url, urlValidationOptions)) {
      return new InvalidUrlError(url)
    } else {
      const config = { uri: url, method: 'get', timeout: 1000, responseType: 'text',
        maxRedirects: 5};
      return request(config);
    }
  } else {
    return new EmptyUrlError();
  }
}

const HttpClient = { get, errors: {InvalidUrlError, EmptyUrlError}, Request:
  request };

export default HttpClient;
