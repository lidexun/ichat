import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morganBody from 'morgan-body'
import mongoose from 'mongoose'
import router from './router/index.js'
import ws from './utils/socket.js'
import { expressjwt } from 'express-jwt'
const app = express({})
dotenv.config()
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})

// middleware
if (process.env.NODE_ENV === 'development') {
  morganBody(app)
}
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(express.json())
app.use(cors())
app.use(
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring(req) {
      var { token } = req.headers
      if (token) return token
      return null
    }
  }).unless({
    path: ['/login', '/register'] //不需要校验的路径
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
ws(server)
