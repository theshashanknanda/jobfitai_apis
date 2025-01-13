const express = require('express')
const router = express.Router()
let userController = require('../controllers/userController')
let {auth} = require('../middlewares/auth')

router.get('/getUser', auth, userController.getUser)

module.exports = router