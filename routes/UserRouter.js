const Router = require('express').Router()
const controller = require('../controllers/UserController')

Router.post('/signup',controller.signup)
Router.get('/details/:userId', controller.GetUserDetails)
Router.put('/update/:userId',controller.UpdateUser)
Router.delete('/delete/:userId', controller.DeleteUser)
Router.get('/all', controller.GetAllUsers)
Router.get('/login',controller.login)

module.exports = Router

