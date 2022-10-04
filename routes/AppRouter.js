const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const ConversationRouter = require('./ConversationRouter')
const MessageRouter = require('./MessageRouter')

//more speciifc routes binded
Router.use('/users', UserRouter)
Router.use('/conversations', ConversationRouter)
Router.use('/messages',MessageRouter)

module.exports = Router