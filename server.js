//psql server establishment
const app = require('express')()
const bodyParser = require('body-parser')
const AppRouter = require('./routes/AppRouter')
const PORT = process.env.PORT || 3001
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/api', AppRouter)
app.listen(PORT, () => console.log(`API Server Started On Port:${PORT}`))
const { User }  = require('./models')


//socket.io establishment
const http = require('http')
const { Server } = require("socket.io")
const { disconnect } = require('process')
const socket = require('express')()
socket.use(cors())
const server = http.createServer(socket)

const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
})

io.on("connection", async (socket) => {

    socket.on('send message', async (recievingUserSocket, sendingUserName) => {
        const reciever = await User.findOne({where:{socket:recievingUserSocket}})
        const sender = await User.findOne({where:{name:sendingUserName}})
        console.log(`send message:::: recieving user's open_chat_with{${reciever.open_chat_with}}  sending user's name{${sendingUserName}}, recieving users socket {${recievingUserSocket}}!!!!!!!!!!!!!!!!!!!!!!!!!!!`)
        if(reciever.open_chat_with === sendingUserName){
            socket.to(recievingUserSocket).emit('recieved message', {senderId:sender.id, recieverId:reciever.id})
        }
    })

    socket.on('send friend request' , ((data)=>{
        console.log('server side send friend request event data', data)
        socket.to(data).emit("recieve friend request", data)
    }))

    socket.on('send typing start', async (recievingUserSocket, sendingUserName)=>{
        const reciever = await User.findOne({where:{socket:recievingUserSocket}})
        if(reciever){
            if(reciever.open_chat_with === sendingUserName){
                socket.to(recievingUserSocket).emit('recieve typing start')
            }
        }
    })

    socket.on('send typing end', async (recievingUserSocket, sendingUserName)=>{
        const reciever = await User.findOne({where:{socket:recievingUserSocket}})
        if(reciever){
            if(reciever.open_chat_with === sendingUserName){
                socket.to(recievingUserSocket).emit('recieve typing end')
            }
        }
    })
})

const SOCKETPORT = process.env.PORT || 3002

server.listen(SOCKETPORT, () => console.log(`Socket server listening on port: ${SOCKETPORT}`))



