var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const verifyToken  = require('../middleware/VerifyToken');
const user = require('../models/Users');

router.get('/getusers',verifyToken, userController.getUsers);//checkAuth middleware
router.post('/adduser', userController.registerForm);
router.post('/deleteUser',verifyToken, userController.deleteUser);//checkAuth middleware
router.post('/userLogin', userController.userLogin);
router.post('/forgotPassword', userController.forgotPassword);

module.exports = router;