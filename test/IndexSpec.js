import { expect } from 'chai'
import Core from '../src/index'

describe('Core module exports', () => {
  it('should be instance of `Object` and has `Object` constructor.', () => {
    expect(Core).to.be.instanceOf(Object)
    expect(Core.constructor.name).to.be.eq('Object')
  })
  it('should have property `Async` that is instance of `Object` and has `Object` constructor.', () => {
    expect(Core.Async).to.be.instanceOf(Object)
    expect(Core.Async.constructor.name).to.be.eq('Object')
  })
  it('should have property `HttpClient` that is instance of `Object` and has `Object` constructor.', () => {
    expect(Core.HttpClient).to.be.instanceOf(Object)
    expect(Core.HttpClient.constructor.name).to.be.eq('Object')
  })
})
