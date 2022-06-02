var express = require('express');
var router = express.Router();

// const { check, body } = require('express-validator');
const waitingController = require('../controllers/waitingController');
// const auth = require('../middleware/auth');

router.get('/waiting',waitingController.waitingForm);
router.post('/waiting',waitingController.waitingRequest);
router.post('/realTime_status', waitingController.realTimeStatus);

module.exports = router;