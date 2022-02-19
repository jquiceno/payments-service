'use strict'

const PaymentService = require('../../src/services/Payment.service')
const paymentProvider = require('../mocks/PaymentProvider')
const { v4: uudi } = require('uuid')

const payment = new PaymentService({ providers: [paymentProvider] })

describe('Test Payment service instance', () => {
  it('Should create new instance of a new payment service', async () => {
    const payment = new PaymentService({ providers: [paymentProvider] })
    expect(payment.providers.length).toBe(1)
  })

  it('Should be an error with invalid provider', async () => {
    try {
      const payment = new PaymentService()
      payment.pay()
    } catch (error) {
      expect(error.message).toBe('Invalid Pyment providers')
    }
  })
})

describe('Test create a new Payment', () => {
  it('Should create new payment and pay it with status success', async () => {
    const newPaymentData = { amount: 20, method: 'creditcard' }

    const newPayment = payment.pay(newPaymentData)

    expect(newPayment.method).toBe(newPaymentData.method)
    expect(newPayment.id).toBeTruthy()
    expect(newPayment.amount).toBe(newPaymentData.amount)
    expect(newPayment.status).toBe('success')
  })

  it('Should be an error, with invalid payment method', async () => {
    const newPaymentData = { amount: 20, method: 'paypal' }

    try {
      payment.pay(newPaymentData)
    } catch (error) {
      expect(error.message).toBe('Invalid payment method')
    }
  })
})

describe('Test reimburse a Payment', () => {
  it('Should return a reimbursed payment', async () => {
    const paymentId = uudi()
    const newPayment = payment.reimburse({ id: paymentId })

    expect(newPayment.id).toBe(paymentId)
    expect(newPayment.status).toBe('reimbursed')
  })

  it('Should return a paltial reimbursed payment', async () => {
    const paymentId = uudi()
    const reimburseAmount = 20
    const newPayment = payment.reimburse({ id: paymentId, amount: reimburseAmount })

    expect(newPayment.id).toBe(paymentId)
    expect(newPayment.status).toBe('reimbursed')
    expect(newPayment.amount).toBe(reimburseAmount)
  })
})
