const config == { method: 'get', timeout: 1000, responseType: 'text', maxRedirects: 5}

function get(url) {
  if (typeof url === 'string') {
    return new Promise((resolve, reject)=>{

    });
  } else {
    throw new Error('Url must be non empty string')
  }
}

const HttpClient = { get };

export default HttpClient;
