'use strict'

const { Router } = require('express')
const router = Router()

module.exports = ({ controllers } = {}) => {
  router.get('/methods', controllers.getAllPaymentMethods)
  router.post('/', controllers.addPayment)
  router.post('/:id/actions/reimburse', controllers.reimbursePayment)

  return router
}
