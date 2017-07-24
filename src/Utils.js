
import path from 'path';

function jsBasename(filename) {
  if (typeof filename === 'string' && filename.length) {
    return path.basename( filename, '.js' ) || new Error('No basename detected for:' + filename);
  } else {
    return new Error('Passed filename is not a string or empty: ' + filename);
  }
}

let Utils = { jsBasename };

export default Utils;
