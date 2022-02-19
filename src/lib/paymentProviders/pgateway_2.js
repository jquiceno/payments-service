'use strict'

const { v4: uudi } = require('uuid')

class PaymentProvider {
  constructor () {
    this.id = 'pgateway_2'
  }

  getPaymentMethods ({ name = false } = {}) {
    const methods = [
      { name: 'paypal' }
    ]

    if (!name) return methods

    return methods.find(method => method.name === name)
  }

  pay ({ amount, method } = {}) {
    const paymentMethods = this.getPaymentMethods({ name: method })

    if (!paymentMethods) throw new Error('Invalid payment method')

    return {
      id: uudi(),
      status: 'success',
      amount,
      method,
      provider: this.id
    }
  }

  reimburse ({ id } = {}) {
    return {
      id,
      status: 'reimbursed'
    }
  }
}

module.exports = new PaymentProvider()
