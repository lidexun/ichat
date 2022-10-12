import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

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
    set: (val) => bcrypt.hashSync(val, 10)
  },
  isAvatarSet: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: ''
  },
  createdTime: {
    type: Date,
    default: Date.now
  }
})

export default model('Users', userSchema)
