const { User, Conversation, userConversation }  = require('../models')

const CreateConversation = async (req,res) => {
    try{
        const conversation = await Conversation.create({title:req.body.title})
        await userConversation.create({userId:req.body.userId, conversationId:conversation.id})
        res.send(conversation)
    }catch(error){
        throw error
    }
}
const GetUsersConversations = async (req,res) => {
    try{
        const userAndConversations = await User.findOne({
            where:{
                id:req.body.userId
            },
            include:[{
                model:Conversation,
                as:'participant'
            }]
        })
        res.send(userAndConversations)
    }catch(error){
        throw error
    }
}

module.exports = {
    CreateConversation,
    GetUsersConversations
}