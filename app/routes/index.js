var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const auth = require('../middleware/auth');


/* Route - /  (ROOT) */
// router.get('/', indexController.homePage);
router.get('/identify', indexController.generateCode);
module.exports = router;