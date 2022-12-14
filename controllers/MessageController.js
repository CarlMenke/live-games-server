const { Message }  = require('../models')

const getMessagesByUsers = async (req,res) => {
    try{
        const {foreignId, primaryId} = req.body
        const sentMessages = await Message.findAll({
            where:{
                senderId:primaryId, 
                recieverId:foreignId
            }
        })
        const recievedMessages = await Message.findAll({
            where:{
                senderId:foreignId, 
                recieverId:primaryId
            }
        })
    res.send({sentMessages:sentMessages,recievedMessages:recievedMessages })
    }catch(error){
        throw error
    }
}
const CreateMessage = async (req,res) => {
    try{
        const {foreignUser, primaryUser, content} = req.body
        const message = await Message.create({
            content:content,
            senderId:primaryUser.id,
            recieverId:foreignUser.id
        })

        res.send({message:message})
    }catch(error){
        throw error
    }
}
const GetRecent = async (req,res) =>{
    try{
        const {user1, user2} = req.body
        const message = await Message.findOne({
            where:{
                senderId:user1.id, 
                recieverId:user2.id
            },
            order: [ [ 'createdAt', 'DESC' ]],
        });
    res.send({message:message})
    }catch(error){
        throw error
    }
}

module.exports = {
    getMessagesByUsers,
    CreateMessage,
    GetRecent
}