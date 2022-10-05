const Router = require('express').Router()
const controller = require('../controllers/ConversationController')
const middleware = require('../middleware')

Router.post(
    '/create',
    middleware.stripToken,
    middleware.verifyToken,
    controller.CreateConversation
)
Router.get(
    '/details/:conversationId', 
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetConversation
)
Router.put(
    '/update',
    middleware.stripToken,
    middleware.verifyToken,
    controller.UpdateConversation
)
Router.delete(
    '/delete',   
    middleware.stripToken,
    middleware.verifyToken,
    controller.DeleteConversation
)
Router.get(
    '/user',
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetUsersConversations
)

module.exports = Router