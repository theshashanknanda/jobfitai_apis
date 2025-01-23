let express = require('express');
let router = express.Router();
let jobController = require('../controllers/jobController')

router.post('/setDisability', jobController.setDisabilityController)

module.exports = router;