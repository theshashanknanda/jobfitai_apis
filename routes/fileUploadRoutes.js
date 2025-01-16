let express = require('express')
let router = express.Router()
let fileController = require('../controllers/fileUploadController')
let {auth} = require('../middlewares/auth')

router.post('/uploadAndSavePdf', auth, fileController.uploadAndSavePdf)

module.exports = router
