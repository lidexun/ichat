import { Router } from 'express'
import {
  login,
  register,
  search,
  message,
  messageHistory
} from '../controllers/user.js'

const router = Router()
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/search').get(search)
router.route('/message').post(message)
router.route('/message').get(messageHistory)

// router.get('/', (req, res) => {
//   res.send({ msg: 'GET/' })
// })
// router.get('/app/:id', (req, res) => {
//   res.send({ msg: 'GET/' })
// })
export default router
