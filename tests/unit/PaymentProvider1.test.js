'use strict'

const paymentProvider = require('../../src/lib/PaymentProviders/pgateway_1')

describe('Test Payment providers methods', () => {
  it('Should have valid methods', async () => {
    expect(typeof paymentProvider.name).toBeTruthy()
    expect(typeof paymentProvider.pay).toBeTruthy()
    expect(typeof paymentProvider.reimburse).toBeTruthy()
  })
})

describe('Test payment methods', () => {
  it('Should return provider payment methods list', async () => {
    const paymentMethods = paymentProvider.getPaymentMethods()

    expect(paymentMethods.length).toBeTruthy()
  })

  it('Should return null with an invalid method', async () => {
    const paymentMethods = paymentProvider.getPaymentMethods({ name: 'paypal' })

    expect(paymentMethods).toBeFalsy()
  })
})
