var express = require('express');
var router = express.Router();

const { check, body } = require('express-validator');
const addressController = require('../controllers/addressController');
const auth = require('../middleware/auth');

router.get('/address',addressController.addressForm);
router.post('/address',[
		check('pubkey').trim().not().isEmpty().withMessage('Please enter a valid ethereum address.')
	],addressController.savePubKey)

module.exports = router;