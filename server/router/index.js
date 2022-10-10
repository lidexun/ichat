import { Router } from 'express'
import { login, register, search } from '../controllers/userController.js'
const router = Router()
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/search').get(search)

// router.get('/', (req, res) => {
//   res.send({ msg: 'GET/' })
// })
// router.get('/app/:id', (req, res) => {
//   res.send({ msg: 'GET/' })
// })
export default router
