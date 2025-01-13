const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authenticationController')

router.post('/signup', authenticationController.signup)
router.post('/login', authenticationController.login)

module.exports = router