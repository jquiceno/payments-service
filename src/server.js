'use strict'

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const pk = require(`${process.cwd()}/package.json`)

const { ENV = 'dev' } = process.env

const app = express()

app.use(morgan(ENV))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/info', (req, res) => res.json({
  service: pk.name,
  status: 'ok',
  version: pk.version
}))

module.exports = app
