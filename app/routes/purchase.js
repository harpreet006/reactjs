var express = require('express');
var router = express.Router();

const { check, body } = require('express-validator');
const purchaseController = require('../controllers/purchaseController');
const auth = require('../middleware/auth');

router.get('/purchase',purchaseController.purchaseIndex);

module.exports = router;
