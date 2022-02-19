'use strict'

class PaymentsController {
  constructor ({ paymentService } = {}) {
    this.paymentService = paymentService
    this.getAllPaymentMethods = this.getAllPaymentMethods.bind(this)
    this.addPayment = this.addPayment.bind(this)
    this.reimbursePayment = this.reimbursePayment.bind(this)
  }

  getAllPaymentMethods (_, res, next) {
    try {
      const paymentMethods = this.paymentService.getAllPaymentMethods()

      return res.json({
        data: paymentMethods,
        statusCode: 200
      })
    } catch (error) {
      return next(error)
    }
  }

  addPayment ({ body }, res, next) {
    try {
      const newPayment = this.paymentService.pay({ ...body })

      return res.json({
        data: newPayment,
        statusCode: 200
      })
    } catch (error) {
      return next(error)
    }
  }

  reimbursePayment ({ body, params }, res, next) {
    try {
      const { id } = params
      const paymentMethods = this.paymentService.reimburse({ id, ...body })

      return res.json({
        data: paymentMethods,
        statusCode: 200
      })
    } catch (error) {
      console.log(error)
      return next(error)
    }
  }
}

module.exports = PaymentsController
