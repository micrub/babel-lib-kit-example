
import HttpClient from './../HttpClient'

function request (url) {
  let result = HttpClient.get(url)
  return result
}

const Async = {
  request
}

export default Async
