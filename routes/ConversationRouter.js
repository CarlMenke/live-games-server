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
    '/user',
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetUsersConversations
)

module.exports = Router