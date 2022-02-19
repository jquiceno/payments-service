'use strict'

const { boomify } = require('@hapi/boom')
function errorHandler (error, req, res, next) {
  if (!error) return next()

  const { output } = boomify(error)
  return res.status(output.statusCode).json(output.payload)
}

module.exports = { errorHandler }
