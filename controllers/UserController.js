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
        const exists = User.findOne({
            where:{
                name:req.body.name
            }
        })
        console.log(exists)
        if(!exists){
            const {name, password} = req.body
            let hashedPassword = await middleware.hashPassword(password)
            const user = await User.create({name:name, password:hashedPassword})
            res.send({user:user,message:"Welcome!"})
        }else{
            res.send({message:"Name Already In Use"})
        }
    }catch(error){
        throw error
    }
}
const login = async (req,res) => {
    try{

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