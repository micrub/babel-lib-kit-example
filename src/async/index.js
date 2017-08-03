
import HttpClient from './../HttpClient';

function request(url) {
  let p = HttpClient.get(url);
  console.log(p);
  return p;
}

const Async = {
  request
};

export default Async;
