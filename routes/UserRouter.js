const Router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')


Router.post(
    '/signup',
    controller.signup
)
Router.post(
    '/details',
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetUserDetails
)
Router.put(
    '/update/:userId',
    middleware.stripToken,
    middleware.verifyToken,
    controller.UpdateUser
)
Router.delete(
    '/delete',
    middleware.stripToken,
    middleware.verifyToken,
    controller.DeleteUser
 )
Router.get(
    '/all',
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetAllUsers
 )
Router.post(
    '/login',
    controller.login
)
Router.put(
    '/update/socket/id',
    middleware.stripToken,
    middleware.verifyToken,
    controller.UpdateSocketId
)
Router.post(
    '/getsocket',
    middleware.stripToken,
    middleware.verifyToken,
    controller.GetSocketFromName
)
Router.post(
    '/friendrequest',
    middleware.stripToken,
    middleware.verifyToken,
    controller.SendFriendRequest
)
Router.post(
    '/friendrequestresponse',
    middleware.stripToken,
    middleware.verifyToken,
    controller.FriendRequestResponse
)
Router.post(
    '/update/openchatwith',
    middleware.stripToken,
    middleware.verifyToken,
    controller.OpenChat
)


module.exports = Router

