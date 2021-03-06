import { expect } from 'chai'
import Core from '../src/index'
import HttpClient from '../src/HttpClient'
import validator from 'validator'

const Async = Core.Async

describe('Async from Core module exports', () => {
  it('should have property `Async` that is instance of `Object` and has `Object` constructor.', () => {
    expect(Async).to.be.instanceOf(Object)
    expect(Async.constructor.name).to.be.eq('Object')
  })
  it('should have `request` property of `Function` type.', () => {
    expect(Async.request).to.be.instanceOf(Function)
    expect(Async.request.constructor.name).to.be.eq('Function')
  })
  describe('`request` using `async` `await` generator function.', () => {
    it('should handle errors like 404.', async () => {
      try {
        await Async.request('http://google.com/ipp')
      } catch (e) {
        expect(e).to.be.instanceOf(HttpClient.errors.HttpNotFoundError)
      }
    })
    it('should return string value.', async () => {
      let myip = await Async.request('http://ifconfig.co/ip')
      myip = myip.replace('\n', '')
      expect(typeof myip).to.be.eq('string')
      expect(validator.isIP(myip)).to.be.eq(true)
    })
    it('should return string values of many requests.', async () => {
      let myip = await Async.request('http://ifconfig.co/ip')
      let mycountry = await Async.request('http://ifconfig.co/country')

      myip = myip.replace('\n', '')
      mycountry = mycountry.replace('\n', '')

      expect(typeof myip).to.be.eq('string')
      expect(validator.isIP(myip)).to.be.eq(true)
      expect(typeof mycountry).to.be.eq('string')
      expect(mycountry.length > 0).to.be.eq(true)
    })
  })
})
