const { Router } = require('express')
const { login, logout, sendMessages } = require('../controllers/users.controllers.js')
const { signUp } = require('../controllers/users.controllers.js')




const router = Router()


router.route('/sign-up').post(signUp)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/send-messages').post(sendMessages)








module.exports = router