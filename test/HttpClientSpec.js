import { expect } from 'chai';
import debug from 'debug';
import Core from '../src/index';


describe('Core.HttpClient module exports', () => {

  const HttpClient = Core.HttpClient;
  it('should be instance of `Object` and has `Object` constructor.', () => {
    expect(HttpClient).to.be.instanceOf(Object);
    expect(HttpClient.constructor.name).to.be.eq('Object');
  })

  it('should have `get` function property', () => {
    expect(HttpClient.get).to.be.instanceOf(Function);
  })
  describe('`get` function throws if first argument is empty string, or not a string',()=>{
    it('`get` function throws if first argument is empty string, or not a string',()=>{
      try {
        let g = HttpClient.get('')
        console.log(g);
      } catch (e) {
        /* handle error */
        expect(e).to.be.instanceOf(Object);
      }
    })
  })

})
