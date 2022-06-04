var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
// const auth = require('../middleware/auth');

const user = require('../models/Users');
const {connection} = require('../services/db');


/* Route - /  (ROOT) */

router.get('/getusers',userController.getUsers);
router.post('/adduser',userController.registerForm);
router.post('/deleteUser',userController.deleteUser);
router.post('/userLogin',userController.userLogin);
router.post('/forgotPassword',userController.forgotPassword);
/*router.get('/login',userController.loginForm);
router.post('/login',userController.userLogin);
router.post('/logout',userController.userLogout);
router.get('/tech',userController.techPage);
router.get('/register',userController.registerForm);
router.post('/register',userController.submitRegisterForm);*/


 

module.exports = router;