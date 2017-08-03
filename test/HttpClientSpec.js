import { expect } from 'chai';
import Core from '../src/index';

let Utils = Core.Utils;

const BASE_NAME = Utils.jsBasename(__filename);

import debug from 'debug';
const dbg = debug(BASE_NAME);


describe('Core.HttpClient module exports interface tests.', () => {

  const HttpClient = Core.HttpClient;
  it('should be instance of `Object` and has `Object` constructor.', () => {
    expect(HttpClient).to.be.instanceOf(Object);
    expect(HttpClient.constructor.name).to.be.eq('Object');
  })

  it('should have `get` function property', () => {
    expect(HttpClient.get).to.be.instanceOf(Function);
  })
  it('should have `request` function property', () => {
    expect(HttpClient.request).to.be.instanceOf(Function);
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
