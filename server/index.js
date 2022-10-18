import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morganBody from 'morgan-body'
import router from './router/index.js'
import mongoose from 'mongoose'
import ws from './utils/socket.js'
const app = express({})
dotenv.config()
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})

// middleware
if (process.env.NODE_ENV === 'development') {
  // morganBody(app)
}
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
ws(server)
