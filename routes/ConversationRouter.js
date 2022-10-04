const Router = require('express').Router()
const controller = require('../controllers/ConversationController')

Router.post('/create',controller.CreateConversation)
Router.get('/details/:userId', controller.GetConversation)
Router.put('/update/:userId',controller.UpdateConversation)
Router.delete('/delete/:userId', controller.DeleteConversation)
Router.get('/all/userId',controller.GetUsersConversations)

module.exports = Router