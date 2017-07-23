import { expect } from 'chai';
import debug from 'debug';
import Core from '../src/index';


describe('Core.HttpClient module exports', () => {

  const HttpClient = Core.HttpClient;
  it('should be instance of `Object` and has `Object` constructor.', () => {
    expect(HttpClient).to.be.instanceOf(Object);
    expect(HttpClient.constructor.name).to.be.eq('Object');
  })

  it('should have `Request` property', () => {
    expect(HttpClient.Request).to.be.instanceOf(Object);
  })

  it('should have `get` function property', () => {
    expect(HttpClient.get).to.be.instanceOf(Function);
  })

  describe('HttpClient.errors',() => {
    it('should have `errors` function property', () => {
      expect(HttpClient.errors).to.be.instanceOf(Object);
    })
    it('all members of `errors` must be instance of `Function`', () => {
      let result = [];
      for (let prop in HttpClient.errors) {
        result.push(typeof HttpClient.errors[prop] === 'function');
      }
      result = result.reduce((acc, value) => { return acc && value})
      expect(result).to.be.true;
    })
  });

  describe('`get` function throws if first argument is empty string, or not a string',()=>{
    it('`get` function throws if first argument is empty string, or not a string',()=>{
        let get = HttpClient.get('')
        expect(get).to.be.instanceOf(HttpClient.errors.EmptyUrlError);
    })
    it('`get` function throws if first argument is invalid url.',()=>{
        let get = HttpClient.get('httx://google.com')
        expect(get).to.be.instanceOf(HttpClient.errors.InvalidUrlError);
    })
    it('`get` function should return Promise in case of valid url.',()=>{
        let get = HttpClient.get('http://google.com')
        let cname = get.constructor.name;
        expect(cname).to.be.eq('Request');
    })
    it('`get` handle execution success in Promise convention. Return non empty string.',(done)=>{
        let get = HttpClient.get('http://google.com')
        get.then((response) => {
          expect(typeof response).to.be.eq('string')
          done();
        })
    })
    it('`get` handle execution failure in Promise convention. Return error object.',(done)=>{
        let get = HttpClient.get('http://google.com/aasdasd')
        get.catch((err) => {
          expect(err).to.be.instanceOf(Object);
          done();
        })
    })
    it('`get` handle execution failure in Promise convention. Return 404 error status code.',(done)=>{
        let get = HttpClient.get('http://google.com/aasdasd')
        get.catch((err) => {
          expect(err.statusCode).to.be.eq(404);
          done();
        })
    })
  })

})
