const {User , Message, Conversation}  = require('../models')
const {Op} = require('sequelize')
const middleware = require('../middleware')



const GetAllUsers = async (req,res) =>{
    try{

    }catch(error){
        throw error
    }
}
const signup = async (req,res) => {
    try{
        console.log(req.body)
        const exists = await User.findOne({
            where:{
                name:req.body.name
            }
        })
        console.log(exists)
        if(!exists){
            const {name, password} = req.body
            let hashedPassword = await middleware.hashPassword(password)
            const user = await User.create({name:name, password:hashedPassword})
            res.send({user:user,login:true, message:`Welcome ${user.name}`})
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
            raw:true
        })

        if(user && (await middleware.comparePassword(user.password, req.body.password))){
            let payload = {
                id:user.id,
                name:user.name
            }
            let token = middleware.createToken(payload)
            res.send({user: payload, token, message:"Welcome!"})
        }else{
            res.status(401).send({message:'Incorrect Password or Name'})
        }
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
    login
}