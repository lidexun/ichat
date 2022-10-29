const { Schema, model } = require('mongoose')
const bcryptjs = require('bcryptjs')
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true,
    min: 8,
    set: (val) => bcryptjs.hashSync(val, 10)
  },
  isAvatarSet: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: ''
  },
  createTime: {
    type: Number,
    default: Math.round(new Date() / 1000),
    set: (val) => Math.round(new Date() / 1000)
  }
})

module.exports = model('Users', userSchema)
