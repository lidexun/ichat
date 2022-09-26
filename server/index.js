const express = require('express')
const cors = require('cors')

const app = express()
const ws = require('socket.io')
require('dotenv').config()

app.use(cors())
app.use(express.json())

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Stared on Port ${process.env.PORT}`)
})

const io = ws(server, {
  cors: {
    credentials: true
  }
})

global.onlineUsers = new Map()

io.on('connection', (socket) => {
  socket.on('hello', (arg) => {
    console.log(arg) // world
  })
  // console.log(socket)
  // global.chatSocket = socket
  // socket.on('add-user', (userId) => {
  //   console.log(userId)
  //   onlineUsers.set(userId, socket.id)
  // })
  // socket.on('send-msg', (data) => {
  //   console.log(data)
  //   const sendUserSocket = onlineUsers.get(data.to)
  //   if (sendUserSocket) {
  //     socket.to(sendUserSocket).emit('msg-recieve', data.msg)
  //   }
  // })
})
