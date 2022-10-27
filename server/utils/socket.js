import { Server } from 'socket.io'
function ws(httpServer) {
  global.io = new Server(httpServer, {
    cors: {
      credentials: true
    }
  })
  global.onlineUsers = new Map()

  io.on('connection', (socket) => {
    // console.log(socket)
    onlineUsers.set(socket.handshake.auth.id, socket.id)
    // console.log( ;
    // socket.on('ping', (data) => {
    //   console.log(data)
    // })
    // socket.on('message', (data, fromid, toid) => {
    //   const toUserID = onlineUsers.get(toid)
    //   if (toUserID) {
    //     console.log(toUserID)
    //     socket.to(toUserID).emit('message', data, fromid, 0)
    //   }
    //   socket.emit('message', data, toid, 1)
    // })
  })
}

export default ws
