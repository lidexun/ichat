const {
  login,
  register,
  search,
  message,
  messageHistory,
  messageRead,
  userDetail
} = require('../controllers/user.js')
const router = require('express').Router()
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/search').get(search)
router.route('/user/detail/:uid').get(userDetail)
router.route('/user/message').post(message)
router.route('/user/message').get(messageHistory)
router.route('/user/message/set_read/:from_uid').put(messageRead)

module.exports = router
