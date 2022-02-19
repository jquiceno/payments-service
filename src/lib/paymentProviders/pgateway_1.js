'use strict'

const { v4: uudi } = require('uuid')

class PaymentProvider {
  constructor () {
    this.id = 'pgateway_1'
  }

  getPaymentMethods ({ name = false } = {}) {
    const methods = [
      { name: 'creditcard' }
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

  reimburse ({ id, amount } = {}) {
    if (amount) return this.partialReimburse({ id, amount })

    return {
      id,
      status: 'reimbursed',
      provider: this.id
    }
  }

  partialReimburse ({ id, amount } = {}) {
    return {
      id,
      amount,
      status: !amount ? 'reimbursed' : 'partial-reimbursed',
      provider: this.id
    }
  }
}

module.exports = new PaymentProvider()
