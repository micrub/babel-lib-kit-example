import request from 'request-promise-native';


function get(url) {
  if (typeof url === 'string' && url.length) {
    const config = { uri: url, method: 'get', timeout: 1000, responseType: 'text',
    maxRedirects: 5};
    return request(config);
  } else {
    throw new Error('Url must be non empty string')
  }
}

const HttpClient = { get };

export default HttpClient;
