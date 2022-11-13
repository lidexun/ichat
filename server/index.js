const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router/index.js')
const { expressjwt } = require('express-jwt')
const { PORT, JWT_SECRET, MONGODB_URL } = require('./config/index.js')
const { verifyToken } = require('./utils/token.js')
const app = express()
const expressWs = require('express-ws')(app)
global.onlineUsers = new Map()
app.ws('/ws/user', (ws, req) => {
  global.aWss = expressWs.getWss('/ws/user')
  const { uid } = verifyToken(req.headers['sec-websocket-protocol'])
  ws.uid = uid
  if (!uid) {
    ws.send(
      JSON.stringify({
        type: 'noauth',
        message: '连接失败,请重试'
      })
    )
    return
  }
  global.onlineUsers.set(uid, Math.round(new Date() / 1000))
  ws.send(
    JSON.stringify({
      type: 'auth is ok',
      message: '连接成功'
    })
  )
  ws.on('message', (wsc, msg) => {
    const { type, message } = JSON.parse(wsc)
    if (type === 'heartbeat') {
      global.onlineUsers.set(uid, Math.round(new Date() / 1000))
    }
  })
})
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production' ? 'http://lidexun.gitee.io' : '*'
  })
)
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(express.json())
app.use(
  expressjwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring(req) {
      var { token } = req.headers
      if (token) return token
      return null
    }
  }).unless({
    path: ['/login', '/register', '/ws/user', '/socket.io/'] //不需要校验的路径
  })
)
app.use((err, req, res, next) => {
  // 这次失败是由token解析失败导致的
  if (err) {
    if (err.code === 'credentials_required') {
      return res.send({
        staus: 401,
        message: err.inner.message
      })
    }
    return res.send({
      status: 500,
      message: '未知的错误'
    })
  }

  next()
})
app.use(router)
// middleware end
const initMongoose = () => {
  mongoose.connect(
    MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        setTimeout(() => {
          initMongoose()
        }, 1000)
        console.log(err)
        return
      }
      console.log('数据库成功连接')
    }
  )
}
initMongoose()
app.listen(PORT, () => {
  console.log(`Server Stared on Port http://localhost:${PORT}`)
})
