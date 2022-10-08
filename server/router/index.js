import { Router } from 'express'
import { login, register } from '../controllers/userController.js'
const router = Router()
router.route('/login').post(login)
router.route('/register').post(register)

// router.get('/', (req, res) => {
//   res.send({ msg: 'GET/' })
// })
// router.get('/app/:id', (req, res) => {
//   res.send({ msg: 'GET/' })
// })
export default router
