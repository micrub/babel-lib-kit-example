import { expect } from 'chai';
import debug from 'debug';
import Core from '../src/index';


describe('Core.HttpClient module exports interface tests.', () => {

  const HttpClient = Core.HttpClient;
  it('should be instance of `Object` and has `Object` constructor.', () => {
    expect(HttpClient).to.be.instanceOf(Object);
    expect(HttpClient.constructor.name).to.be.eq('Object');
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

})
