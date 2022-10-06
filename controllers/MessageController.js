const {User, Message, Conversation}  = require('../models')

const getMessagesByConversation = async (req,res) => {
    try{
        const conversationAndMessages = await Conversation.findOne({
            where:{
                id:req.body.conversationId
            },
            include:[{
                model:Message,
                as:'conversationOwner'
            }]
        })
        res.send(conversationAndMessages)
    }catch(error){
        throw error
    }
}
const CreateMessage = async (req,res) => {
    try{
        const message = await Message.create({
            content:req.body.content,
            senderId:req.body.senderId,
            conversationId:req.body.conversationId
        })
        res.send(message)
    }catch(error){
        throw error
    }
}
const DeleteMessage = async (req,res) => {
    try{

    }catch(error){
        throw error
    }
}

module.exports = {
    getMessagesByConversation,
    DeleteMessage,
    CreateMessage,
}