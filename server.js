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
app.listen(3001, () => console.log(`API Server Started On Port: 3001`))


//socket.io establishment
const http = require('http')
const { Server } = require("socket.io")
const { disconnect } = require('process')
const socket = require('express')()
socket.use(cors())
const server = http.createServer(socket)

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"]
    }
})

io.on("connection", async (socket) => {
    socket.on("send private message", ({recipientId, message}) => {
        socket.to(recipientId).emit("recieve private message", message)
    }) 

    socket.on("getSocketId", () => {
        socket.emit("recievedSocketId",socket.id)
    })

    socket.on('send reload' , ((data)=>{
        socket.to(data.socket).emit("recieve reload", data)
    }))

    socket.on('send typing start',(userSocketId)=>{
        socket.to(userSocketId).emit("recieve typing start")
    })

    socket.on('send typing end',(userSocketId)=>{
        socket.to(userSocketId).emit("recieve typing end")
    })
})

server.listen(3002, () => console.log("Socket.io Server Started On Port: 3002"))



