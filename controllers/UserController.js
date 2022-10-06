const {User , Message, Conversation, UserFriendRequests, UserFriends}  = require('../models')
const middleware = require('../middleware')

const GetAllUsers = async (req,res) => {
    try{

    }catch(error){
        throw error
    }
}
const signup = async (req,res) => {
    try{
        const exists = await User.findOne({
            where:{
                name:req.body.name
            },
            include:[{
                model:User,
                as:'friendrequestrecieved',
                through:UserFriendRequests
            }]
        })
        if(!exists){
            const { name, password } = req.body
            let hashedPassword = await middleware.hashPassword(password)
            const user = await User.create({name:name, password:hashedPassword,socket:'Not Yet Connected'})
            let payload = {
                id:user.id,
                name:user.name
            }
            let token = middleware.createToken(payload)
            res.send({user: user, token, login:true, message:`Welcome ${user.name}`})
        }else{
            res.send({login:false, message:"Name Already In Use, Try Again"})
        }
    }catch(error){
        throw error
    }
}
const login = async (req,res) => {
    try{
        const user = await User.findOne({
            where:{
                name:req.body.name,
            },           
            include:[{
                model:User,
                as:'friendrequestrecieved',
                through:UserFriendRequests
        },
        {
            model:User,
            as:'friend',
            through:UserFriends
    }]})
        if(user && (await middleware.comparePassword(user.password, req.body.password))){
            let payload = {
                id:user.id,
                name:user.name
            }
            let token = middleware.createToken(payload)
            res.send({user: payload, token, login:true, message:`Welcome ${user.name}`})
        }else{
            res.send({login:false, message:'Incorrect Password or Name'})
        }
    }catch(error){
        throw error
    }
}
const UpdateSocketId = async (req,res) => {
    try{
        let user = await User.findOne(
            {where:{name:req.body.name},
            include:[{
                model:User,
                as:'friendrequestrecieved',
                through:UserFriendRequests
        },
        {
            model:User,
            as:'friend',
            through:UserFriends
    }]})
        user.set({socket:req.body.socket})
        user = await user.save()
        res.send(user)
    }catch(error){
        throw error
    }
}
const UpdateUser = async (req,res) => {
    try{

    }catch(error){
        throw error
    }
}
const DeleteUser = async (req,res) => {
    try{

    }catch(error){
        throw error
    }
}
const GetUserDetails = async (req,res) => {
    try{
        const user = await User.findOne({
            where:{
                id:req.body.userId
            },
            include:[{
                model:User,
                as:'friendrequestrecieved',
                through:UserFriendRequests
        },
        {
            model:User,
            as:'friend',
            through:UserFriends
    }]})
        res.send(user)
    }catch(error){
        throw error
    }
}
const GetSocketFromName = async (req,res) => {
    try{
        const user = await User.findOne({
            where:{
                name:req.body.name
            },           
            include:[{
                model:User,
                as:'friendrequestrecieved',
                through:UserFriendRequests
        },
        {
            model:User,
            as:'friend',
            through:UserFriends
    }]})
        res.send(user.socket)
    }catch(error){
        throw error
    }
}
const SendFriendRequest = async (req,res) => {
    try{
        const {senderId, recieverName} = req.body
        const user = await User.findOne({
            where:{name:recieverName}
        })
        if(!user){
            res.send({message:'User Not Found'})
        }else{
            const check1 = await UserFriendRequests.findOne({where:{userId:senderId, friendId:user.id}})
            const check2 = await UserFriends.findOne({where:{userId:senderId, friendId:user.id}})
            if(check1){
                res.send({message:"Request Pending"})
            }
            else if(check2){
                res.send({message:"Already Friends"})
            }else{
                const request = await UserFriendRequests.create({userId:senderId, friendId:user.id})
                res.send({requestIds:request, message:`Friend Request Sent To ${recieverName}`})
            }
        }
    }catch(error){
        throw error
    }
}
const FriendRequestResponse = async (req,res) => {
    try{
        const {userId, friendId, choice,} = req.body
        await UserFriendRequests.destroy({where:{userId:userId, friendId:friendId}})
        const user = await User.findOne({
            where:{
                id:friendId
            },           
            include:[{
                model:User,
                as:'friendrequestrecieved',
                through:UserFriendRequests
        },
        {
            model:User,
            as:'friend',
            through:UserFriends
    }]})
        if(choice){
            await UserFriends.create({userId:userId, friendId:friendId})
            await UserFriends.create({userId:friendId, friendId:userId})
            res.send({user:user})
        }else{
            res.send({message:`${friend.name}'s friend request denied.`})
        }
    }catch(error){
        throw error
    }
}
module.exports = {
    signup,
    DeleteUser,
    GetUserDetails,
    UpdateUser,
    GetAllUsers,
    login,
    UpdateSocketId,
    GetSocketFromName,
    SendFriendRequest,
    FriendRequestResponse,
}