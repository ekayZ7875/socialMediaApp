const { Router } = require('express')
const { login } = require('../controllers/users.controllers.js')
const { signUp } = require('../controllers/users.controllers.js')




const router = Router()


router.route('/sign-up').post(signUp)
router.route('/login').post(login)








export default router