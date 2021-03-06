
import Constants from './Constants'

import path from 'path'
import debug from 'debug'
import localStorage from 'localStorage'

// node doesnt have debug function of console
console.debug = console.debug || console.info

const C = Constants

const NS = C.PACKAGE_NS
const SP = C.SP
const DEBUG = C.DEBUG
const DEBUG_LOCAL_STORAGE_NS = 'debug'
const UNDETECTED = C.UNDETECTED

let START_HASH_VALUE = 5381

let isNode = true

if (typeof window !== 'undefined' && window.document) {
  isNode = false
}

let dbg = () => {
  return () => {}
}

if (NS) {
  let pattern = [NS, SP, '*'].join('')
  if (DEBUG) {
    dbg = (filename) => {
      filename = jsBasename(filename) || UNDETECTED
      const DBG_NS = [NS, filename].join(SP)
      let dfnk = debug(DBG_NS)
      return dfnk
    }
    if (!isNode) {
      if (!localStorage.getItem(DEBUG_LOCAL_STORAGE_NS)) {
        console.debug(pattern, 'Debug enabled for:', pattern)
        console.debug(pattern, 'See localStorage `debug` item.')
        console.debug(pattern, 'ATTENTION! Application debug console messages will be show only after page reload.')
        localStorage.setItem(DEBUG_LOCAL_STORAGE_NS, pattern)
      }
    }
  } else {
    if (!isNode) {
      console.debug(pattern, 'debug disabed.')
      localStorage.removeItem(DEBUG_LOCAL_STORAGE_NS)
    }
  }
}

function reduceToHash (array) {
  return array.reduce((prev, curr) => {
    return ((prev << 5) + prev) + curr
  }, START_HASH_VALUE)
}

function djb2 (input) {
  if (input && input.constructor && input.constructor.name === 'Array' && input.length) {
    return reduceToHash(input)
  } else if (input && typeof input === 'string' && input.length) {
    return reduceToHash(input.split('').map((str) => { return str.charCodeAt(0) }))
  } else {
    return new Error('Empty input.' + JSON.stringify(input))
  }
}

function jsBasename (filename) {
  const EXT = '.js'
  if (typeof filename === 'string' && filename.length) {
    if (path.extname(filename) === EXT) {
      return path.basename(filename, EXT) || new Error('No basename detected for :' + filename)
    } else {
      return new Error('Passed filename is not `' + EXT + '` file : ' + filename)
    }
  } else {
    return new Error('Passed filename is not a string or empty : ' + filename)
  }
}

let Utils = {jsBasename, djb2, debug, dbg, NS, SP}

export default Utils
