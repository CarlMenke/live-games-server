const Router = require('express').Router()
const controller = require('../controllers/MessageController')

Router.post('/create',controller.CreateMessage)
Router.get('/details/:userId', controller.getMessages)
Router.delete('/update/:userId',controller.DeleteMessage)

module.exports = Router
