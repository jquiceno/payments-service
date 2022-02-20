'use strict'

const supertest = require('supertest')
const pk = require(`${process.cwd()}/package.json`)
const paymentsRoutes = require('../../src/routes/payments.routes')
const PaymentService = require('../../src/services/Payment.service')
const PaymentController = require('../../src/controllers/Payment.controller')
const paymentProvider = require('../mocks/PaymentProvider')
const server = require('../../src/server')

const paymentService = new PaymentService({ providers: [paymentProvider] })
const paymentController = new PaymentController({ paymentService })

describe('Test server instance', () => {
  const api = supertest(server)

  it('Should have some basic functions', async () => {
    expect(typeof server.listen).toBeTruthy()
    expect(typeof server.use).toBeTruthy()
  })

  it('Should response with service info', async () => {
    const { body: info } = await api.get('/info').expect(200)

    expect(info.service).toBe(pk.name)
    expect(info.status).toBe('ok')
    expect(info.version).toBe(pk.version)
  })
})

describe('Test payments routes', () => {
  server.use('/payments', paymentsRoutes({ controllers: paymentController }))
  const paymentMethods = paymentProvider.getPaymentMethods()
  const newPaymentData = {
    amount: 20,
    method: paymentMethods[0].name
  }
  const api = supertest(server)

  it('Should return avalible payment methods', async () => {
    const { body: { data } } = await api.get('/payments/methods').expect(200)

    expect(data.length).toBe(paymentMethods.length)
  })

  it('Should return a created payment', async () => {
    const { body: { data } } = await api.post('/payments')
      .send(newPaymentData)
      .expect(201)

    expect(data.id).toBeTruthy()
    expect(data.status).toBe('success')
    expect(data.amount).toBe(newPaymentData.amount)
    expect(data.method).toBe(newPaymentData.method)
    expect(data.provider).toBe(paymentProvider.id)
  })

  // payments/b56cae5e-4156-4581-b0f9-50c81a5ce363/actions/reimburse

  it('Should return a reimbursed payment', async () => {
    const newPayment = paymentProvider.pay(newPaymentData)

    const { body: { data } } = await api.post(`/payments/${newPayment}/actions/reimburse`)
      .send(newPayment)
      .expect(201)

    expect(data.id).toBe(newPayment.id)
    expect(data.status).toBe('reimbursed')
    expect(data.amount).toBe(newPayment.amount)
  })
})
