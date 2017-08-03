import { inherits } from 'util'

import http from 'http'
import Utils from './Utils'
import { parse as urlParse } from 'url'
import isURL from 'validator/lib/isURL'

function HttpNotFoundError (message, extra) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.code = 404
  this.message = 'Url not found : ' + message
  this.extra = extra
}

function TimeoutError (message, extra) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = 'ETIMEOUT'
  this.extra = extra
}

function SocketTimeoutError (message, extra) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = 'ESOCKETTIMEDOUT'
  this.extra = extra
}
function InvalidUrlError (message, extra) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = 'Passed url must be valid :' + message
  this.extra = extra
}
function EmptyUrlError (message, extra) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = 'Url must be NON empty string.'
  this.extra = extra
}

let errors = {
  InvalidUrlError,
  EmptyUrlError,
  HttpNotFoundError,
  TimeoutError,
  SocketTimeoutError
}

for (var prop in errors) {
  let errorFnk = errors[prop]
  inherits(errorFnk, Error)
}

const dbg = Utils.dbg(__filename)

const request = http.get

let urlValidationOptions = {
  protocols: ['http', 'https'],
  require_protocol: true
}

function returnPromise (config) {
  return new Promise((resolve, reject) => {
    let req = request(config, (response) => {
      if (response.statusCode < 200) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode))
      } else if (response.statusCode >= 200 && response.statusCode < 299) {
        let body = []
        response.on('data', (chunk) => body.push(chunk))
        response.on('end', () => {
          dbg('HttpClient response end:' + response.statusCode)
          resolve(body.join(''))
        })
      } else if (response.statusCode >= 300 && response.statusCode < 400) {
        let location = response.headers.location
        if (config.maxRedirects) {
          if (location && isURL(location)) {
            let redirectCount = 0
            if (config.redirectCount === null) {
              redirectCount = 1
            } else {
              redirectCount = redirectCount + 1
            }
            if (redirectCount >= config.maxRedirects) {
              reject(new Error('Maximum redirects limit reached: ' + redirectCount + ' out of ' + config.maxRedirects))
            } else {
              if (config.timeout) {
                // TODO probably not implemented propperly
                setTimeout(function () {
                  req.abort()
                  reject(new TimeoutError())
                }, config.timeout)
              }
              resolve(get(location, redirectCount))
            }
          } else {
            reject(new Error('Not redirecting to invalid location : ' + location))
          }
        } else {
          resolve(get(location))
        }
      } else {
        if (response.statusCode === 404) {
          let href = config.href || 'undefinedErr'
          reject(new HttpNotFoundError(href))
        } else {
          reject(new Error('Http status code: ' + response.statusCode))
        }
      }
    })
    // Set additional timeout on socket - in case if remote
    // server freeze after sending headers
    if (config.timeout) { // only works on node 0.6+
      // TODO probably not implemented propperly
      req.setTimeout(config.timeout, function () {
        if (req) {
          req.abort()
          reject(new SocketTimeoutError())
        }
      })
    }
    req.on('error', (err) => {
      reject(err)
    })
    req.end()
  })
}

function get (url, isRedirect = null) {
  if (typeof url === 'string' && url.length) {
    if (!isURL(url, urlValidationOptions)) {
      return new InvalidUrlError(url)
    } else {
      const parsedUrl = urlParse(url)
      const defaults = { method: 'get', timeout: 1000, maxRedirects: 5 }
      let redirectCount = null
      if (isRedirect !== null) {
        redirectCount = isRedirect
      }
      const config = { ...defaults, ...parsedUrl, redirectCount }
      return returnPromise(config)
    }
  } else {
    return new EmptyUrlError()
  }
}

const HttpClient = { get, errors, request }

export default HttpClient
