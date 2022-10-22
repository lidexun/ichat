import User from '../models/user.js'
import Message from '../models/message.js'
import bcrypt from 'bcrypt'
import { generateToken, verifyToken } from '../utils/token.js'
// 登陆
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.json({
        message: '用户名或密码不能为空'
      })
    }
    if (username.length < 3) {
      return res.json({
        message: '请输入用户名, 不能少于3位数'
      })
    }
    if (password.length < 6) {
      return res.json({
        message: '请输入正确的密码'
      })
    }
    const userData = await User.findOne({ username })
    if (userData === null) {
      return res.json({
        message: '请正确的用户名'
      })
    }
    const isPasswordValid = bcrypt.compareSync(password, userData.password)
    if (!isPasswordValid) {
      return res.json({ message: '用户名或密码不正确', status: false })
    }
    const token = generateToken(userData._id.toHexString())
    const data = {
      token,
      ...Object.assign(userData._doc),
      __v: undefined,
      password: undefined
    }
    return res.json({
      data,
      message: '登录成功'
    })
  } catch (ex) {
    next(ex)
  }
}
// 注册
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    if (!username || !password) {
      return res.json({
        message: '用户名或密码不能为空'
      })
    }
    if (username.length < 3) {
      return res.json({
        message: '请输入用户名, 不能少于3位数'
      })
    }
    if (password.length < 6) {
      return res.json({
        message: '请输入正确的密码, 不能少于6位数'
      })
    }
    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
      return res.json({ message: '邮箱已使用' })
    }
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck !== null) {
      return res.json({ message: '用户名已使用' })
    }
    const user = await User.create({
      username,
      password,
      email,
      createTime: new Date()
    })
    const token = generateToken(user._id.toHexString())
    const data = {
      token,
      ...Object.assign(user._doc),
      __v: undefined,
      password: undefined
    }
    return res.json({ status: 200, data, message: '注册成功' })
  } catch (ex) {
    next(ex)
  }
}
export const search = async (req, res, next) => {
  try {
    const { username } = req.query
    const list = await User.find({ username: { $regex: username } }).select([
      'email',
      'username',
      'avatarImage',
      '_id'
    ])
    return res.json({
      data: {
        list
      }
    })
  } catch (ex) {
    next(ex)
  }
}
export const message = async (req, res, next) => {
  try {
    const { from_uid, to_uid, content_type, content } = req.body
    const data = await Message.create({
      from_uid,
      to_uid,
      content_type,
      content,
      is_read: 0
    })
    const userinfo = await User.find({
      _id: {
        $in: [from_uid, to_uid]
      }
    }).select(['email', 'username', 'email', '_id', 'avatar', 'createTime'])
    const toUserID = onlineUsers.get(to_uid)
    if (toUserID) {
      io.sockets.to(toUserID).emit('message', {
        ...data._doc,
        userinfo: userinfo.find((item) => item._id.toHexString() === from_uid)
      })
    }
    return res.json({
      status: 200,
      data: {
        ...data._doc,
        userinfo: userinfo.find((item) => item._id.toHexString() === to_uid)
      },
      message: ''
    })
  } catch (ex) {
    next(ex)
  }
}

export const messageHistory = async (req, res, next) => {
  try {
    const { uid } = await verifyToken(req.headers.token)
    const { time } = req.query
    let data = await Message.find({
      $or: [
        {
          from_uid: uid
        },
        {
          to_uid: uid
        }
      ],
      createTime: {
        $gt: time
      }
    }).sort({ createTime: -1 })
    if (data.length === 0) {
      return res.json({ status: 200, data, message: '' })
    }
    let map = new Map()
    const users = []
    for (let index = 0; index < data.length; index++) {
      const item = data[index]
      const key = item.from_uid === uid ? item.to_uid : item.from_uid
      let temp = map.get(key)
      if (temp) {
        map.set(key, [...temp, item])
      } else {
        users.push(key)
        map.set(key, [item])
      }
    }
    const userData = await User.find({
      _id: {
        $in: users
      }
    }).select(['email', 'username', 'email', '_id', 'avatar', 'createTime'])
    const userMap = new Map()
    for (let index = 0; index < userData.length; index++) {
      userMap.set(userData[index]._id.toHexString(), userData[index]._doc)
    }
    const tranfData = data.map((item) => {
      const key = item.from_uid === uid ? item.to_uid : item.from_uid
      const userinfo = userMap.get(key)
      return { ...item._doc, userinfo }
    })
    return res.json({ status: 200, data: tranfData, message: '' })
  } catch (ex) {
    next(ex)
  }
}
export const messageRead = async (req, res, next) => {
  try {
    const { from_uid } = req.params
    const { uid } = await verifyToken(req.headers.token)
    let data = await Message.updateMany(
      {
        $or: [
          {
            from_uid,
            to_uid: uid
          }
        ]
      },
      { $set: { is_read: 1 } }
    )
    return res.json({
      status: 200,
      data: {},
      message: '已更新已读消息'
    })
  } catch (ex) {
    next(ex)
  }
}
export const userDetail = async (req, res, next) => {
  try {
    const { uid } = req.params
    const userData = await User.find({
      _id: uid
    }).select(['email', 'username', 'email', '_id', 'avatar', 'createTime'])
    return res.json({
      status: 200,
      data: userData[0],
      message: ''
    })
  } catch (ex) {
    next(ex)
  }
}
