import Async from './async/index';
import HttpClient from './HttpClient';
import Utils from './Utils';



Utils.dbg(__filename)('zzz');
//console.log('z', new Date().toString());

const Core = {
  Async,
  HttpClient,
  Utils
};

export default Core;
