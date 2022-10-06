const {User , Message, Conversation, UserFriendRequests}  = require('../models')
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
            where:{name:req.body.name},
            raw:true,
            include:[{
                model:User,
                as:'friendrequestrecieved',
                through:UserFriendRequests
            }]
        })

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
            }]}
        )
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
            }]
        })
        console.log(user)
        res.send(user)
    }catch(error){
        throw error
    }
}
const GetSocketFromName = async (req,res) => {
    try{
        const user = await User.findOne({
            where:{name:req.body.name}
        })
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
            const check = await UserFriendRequests.findOne({where:{userId:senderId, friendId:user.id}})
            if(check){
                res.send({message:"Request Pending"})
            }else{
                const request = await UserFriendRequests.create({userId:senderId, friendId:user.id})
                res.send({requestIds:request, message:`Friend Request Sent To ${recieverName}`})
            }
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
    SendFriendRequest
}