'use strict'

const { v4: uudi } = require('uuid')

class PaymentProvider {
  constructor () {
    this.id = 'stripe'
  }

  getPaymentMethods ({ name = false } = {}) {
    const methods = [
      { name: 'creditcard' },
      { name: 'banktransfer' }
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
      method
    }
  }

  reimburse ({ id, amount } = {}) {
    if (amount) return this.partialReimburse({ id, amount })

    return {
      id,
      status: 'reimbursed'
    }
  }

  partialReimburse ({ id, amount } = {}) {
    return {
      id,
      amount,
      status: 'reimbursed'
    }
  }
}

module.exports = new PaymentProvider()