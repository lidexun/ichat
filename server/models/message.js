import { Schema, model } from 'mongoose'
const messageSchema = new Schema({
  // userID: { type: Schema.Types.ObjectId, ref: 'User' },
  from_uid: {
    type: String,
    default: ''
  },
  to_uid: {
    type: String,
    default: ''
  },
  content_type: { type: String, default: 1 },
  content: { type: String, default: '' },
  createTime: {
    type: Date,
    default: Date.now
  },
  is_read: { type: String, default: 0 }
})

export default model('message', messageSchema)
