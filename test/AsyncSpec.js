import { expect } from 'chai';
import Core from '../src/index';

const Async = Core.Async;


describe('Async from Core module exports', () => {

  it('should have property `Async` that is instance of `Object` and has `Object` constructor.', () => {
    expect(Async).to.be.instanceOf(Object);
    expect(Async.constructor.name).to.be.eq('Object');
  })
  it('should have `request` property of `Function` type.', () => {
    expect(Async.request).to.be.instanceOf(Function);
    expect(Async.request.constructor.name).to.be.eq('Function');
  })

  describe('`request` function', () => {
    it('should return value while executing ASYNC work.', (done) => {
      let req = Async.request('http://ifconfig.co/')
      //console.log(req);
      done()
    })
    //it('should return value while executing ASYNC work.', (done) => {
      //let req = Async.request('http://google.com')
      //req.then((res)=>{
        //console.log(res);
      //})
    //})
  })

})
