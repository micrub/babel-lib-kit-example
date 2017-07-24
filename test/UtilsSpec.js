import { expect } from 'chai';
import Core from '../src/index';

let Utils = Core.Utils;


describe('Core.Utils module exports tests.', () => {


  it('should be instance of `Object` and has `Object` constructor.', () => {
    expect(Utils).to.be.instanceOf(Object);
  })

  it('should have property `jsBasename` that is instance of `Function`.', () => {
    expect(Utils.jsBasename).to.be.instanceOf(Function);
  })
  it('should have property `NS` that is non empty string.', () => {
    let C = Utils.NS;
    expect(typeof C).to.be.eq('string')
    expect(C.length > 0).to.be.true;
  })
  it('should have property `SP` that is non empty string.', () => {
    let C = Utils.SP;
    expect(typeof C).to.be.eq('string')
    expect(C.length > 0).to.be.true;
  })
  it('should have property `SP` equals to "-".', () => {
    let C = Utils.SP;
    expect(C).to.be.eq('-')
  })
  it('should have property `djb2` that is instance of `Function`.', () => {
    expect(Utils.djb2).to.be.instanceOf(Function);
  })
  describe('Core.Utils.djb2 tests.', () => {
    const results = [ [ "test", 2090756197 ], [[101,102],5863344] ];
    it('should return Error on empty string or array.', () => {
      expect(Utils.djb2()).to.be.instanceOf(Object);
      expect(Utils.djb2('')).to.be.instanceOf(Object);
      expect(Utils.djb2([])).to.be.instanceOf(Object);
    })
    for (var i = 0, l = results.length; i < l; i ++) {
      var result = results[i];
      let key = result[0];
      let hash = result[1];
      it('should return `'+ hash +'` for `'+ key +'`', () => {
        expect(Utils.djb2(key)).to.be.eq(hash)
      })
    }
  })

  describe('Core.Utils.jsBasename tests.', () => {
    it('should return Error on non sting or empty string.', () => {
      expect(Utils.jsBasename()).to.be.instanceOf(Object);
      expect(Utils.jsBasename('')).to.be.instanceOf(Object);
      expect(Utils.jsBasename([])).to.be.instanceOf(Object);
    })
    let tsHash = () => {
      let d = new Date();
      let o = d.toUTCString() + ':' + d.getUTCMilliseconds()
      return Utils.djb2(o);
    }
    it('should return Error on non js extension path string.', () => {
      let result = Utils.jsBasename('/tmp/test-' + tsHash() + '.some');
      expect(result).to.be.instanceOf(Object);
    })
    it('should return baseName on js extension path string.', () => {
      let result = Utils.jsBasename(__filename);
      expect(result).to.be.eq('UtilsSpec')
    })
  })

})
