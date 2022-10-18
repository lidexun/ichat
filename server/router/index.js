import { Router } from 'express'
import {
  login,
  register,
  search,
  message,
  messageHistory,
  messageRead
} from '../controllers/user.js'

const router = Router()
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/search').get(search)
router.route('/user/message').post(message)
router.route('/user/message').get(messageHistory)
router.route('/user/message/set_read/:from_uid').put(messageRead)

export default router
