import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morganBody from 'morgan-body'
import router from './router/index.js'
import mongoose from 'mongoose'
// // const ws = require('socket.io')
const app = express()
dotenv.config()
// middleware
// morganBody(app)
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(express.json())
app.use(cors())
app.use(router)
// middleware end
mongoose.connect(
  process.env.MONGODB_LOCAL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err)
    console.log('数据库成功连接')
  }
)
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Stared on Port http://localhost:${process.env.PORT}`)
})

// const chatSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'a user must have a name'],
//     unique: true
//   },
//   age: Number
// })
// const chat = mongoose.model('Chat', chatSchema)

// chat.find(
//   {
//     name: '李'
//   },
//   (err, doc) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(doc)
//     }
//   }
// )

// const io = ws(server, {
//   cors: {
//     credentials: true
//   }
// })

// global.onlineUsers = new Map()

// io.on('connection', (socket) => {
//   socket.on('hello', (arg) => {
//     console.log(arg) // world
//   })
//   console.log(socket)
//   global.chatSocket = socket
//   socket.on('add-user', (userId) => {
//     console.log(userId)
//     onlineUsers.set(userId, socket.id)
//   })
//   socket.on('send-msg', (data) => {
//     console.log(data)
//     const sendUserSocket = onlineUsers.get(data.to)
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit('msg-recieve', data.msg)
//     }
//   })
// })
