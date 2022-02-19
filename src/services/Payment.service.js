'use strict'

class PaymentService {
  constructor ({ providers } = {}) {
    if (!providers || !Array.isArray(providers)) throw new Error('Invalid Pyment providers')
    this.providers = providers
  }

  getProviderByPaymentMethod ({ methodId } = {}) {
    const [provider] = this.providers.filter(provider => {
      const paymentMethods = provider.getPaymentMethods()
      if (paymentMethods.find(method => method.name === methodId)) return provider
      return false
    })

    return provider
  }

  getProviderById ({ id } = {}) {
    return this.providers.find(provider => provider.id === id)
  }

  pay ({ amount, method } = {}) {
    const provider = this.getProviderByPaymentMethod({ methodId: method })
    if (!provider) throw new Error('Invalid payment method')

    return provider.pay({ amount, method })
  }

  get ({ id } = {}) {
    return {
      id,
      providerId: this.providers[0].id
    }
  }

  reimburse ({ id, amount } = {}) {
    const { providerId } = this.get({ id })
    const provider = this.getProviderById({ id: providerId })

    if (!provider) throw new Error('Invalid payment id')

    return provider.reimburse({ id, amount })
  }

  getAllPaymentMethods () {
    let paymentMethods = []
    this.providers.forEach(provider => {
      paymentMethods = paymentMethods.concat(provider.getPaymentMethods())
    })

    return paymentMethods
  }
}

module.exports = PaymentService
