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

  describe('Core.Utils.jsBasename tests.', () => {
    it('should return Error on non sting or empty string.', () => {
      expect(Utils.jsBasename()).to.be.instanceOf(Object);
      expect(Utils.jsBasename('')).to.be.instanceOf(Object);
      expect(Utils.jsBasename([])).to.be.instanceOf(Object);
    })
    let tsHash = () => {
      let d = new Date();
      let o = d.toUTCString() + ':' + d.getUTCMilliseconds()
      let h = (input) => {
      }
      return h(o).replace('.','-');
    }
    it('should return Error on non js extension path string.', () => {
      let result = Utils.jsBasename('/tmp/test-' + new Date() + '.some');
      console.log(result);
      expect(result).to.be.instanceOf(Object);
    })
    it('should return baseName on js extension path string.', () => {
      let result = Utils.jsBasename(__filename);
      //console.log(result);
      expect(result).to.be.instanceOf(Object);
    })
  })

})
