const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const MessageRouter = require('./MessageRouter')

Router.use('/users', UserRouter)
Router.use('/messages',MessageRouter)

module.exports = Router