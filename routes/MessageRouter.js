const Router = require('express').Router()
const controller = require('../controllers/MessageController')

Router.post('/create',controller.CreateMessage)
Router.get('/by/conversation', controller.getMessagesByConversation)
Router.delete('/update/:userId',controller.DeleteMessage)

module.exports = Router
