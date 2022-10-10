import { Server } from 'socket.io'
function ws(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      credentials: true
    }
  })
  const onlineUsers = new Map()

  io.on('connection', (socket) => {
    onlineUsers.set(socket.handshake.auth.id, socket.id)
    socket.on('message', (data, fromid, toid) => {
      console.log(fromid)
      const toUserID = onlineUsers.get(toid)
      if (toUserID) {
        console.log(toUserID)
        socket.to(toUserID).emit('message', data, fromid, 0)
      }
      socket.emit('message', data, toid, 1)
    })
  })
}

export default ws
