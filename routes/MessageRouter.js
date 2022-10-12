const Router = require('express').Router()
const controller = require('../controllers/MessageController')

Router.post('/create',controller.CreateMessage)
Router.post('/conversation', controller.getMessagesByUsers)
Router.post('/getRecent', controller.GetRecent)

module.exports = Router
