'use strict'

require('dotenv').config()
const paymentsProviders = require('./lib/paymentProviders')
const PaymentService = require('./services/Payment.service')
const PaymentController = require('./controllers/Payment.controller')
const paymentsRoutes = require('./routes/payments.routes')
const server = require('./server')
const { errorHandler } = require('./helpers')

const { PORT = 3000 } = process.env

async function main () {
  try {
    const paymentService = new PaymentService({ providers: paymentsProviders })
    const paymentController = new PaymentController({ paymentService })

    server.use('/payments', paymentsRoutes({ controllers: paymentController }))
    server.use(errorHandler)

    server.listen(PORT, () => {
      console.log(`Server start in port ${PORT}`)
    })
  } catch (error) {
    console.error(`There is an error starting app: ${error}`)
    process.exit(0)
  }
}

main()
