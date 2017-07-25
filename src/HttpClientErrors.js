
import { inherits } from 'util';


function HttpNotFoundError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.code = 404;
  this.message = 'Url not found :' + message;
  this.extra = extra;
};

function TimeoutError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.code = "ETIMEDOUT"
  this.message = 'ETIMEOUT'
  this.extra = extra;
};

function SocketTimeoutError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.code = "ESOCKETTIMEDOUT"
  this.message = "ESOCKETTIMEDOUT"
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

let HttpClientErrors = {InvalidUrlError, EmptyUrlError,
  HttpNotFoundError,TimeoutError,SocketTimeoutError};

for (var prop in HttpNotFoundError) {
  let errorFnk = errors[prop];
  inherits(errorFnk, Error);
}

export default HttpClientErrors;
