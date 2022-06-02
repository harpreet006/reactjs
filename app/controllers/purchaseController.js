const {connection} = require('../services/db');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
var randomBytes = require('randombytes');
const userModel= new User();
const {authentication} =  require('../services/helper');
/**
* This function will show address form.
*/

function getUserEmail(userId,callback){
	connection.query(userModel.getUserEmail(userId), (err,result) => {
		if(err) return console.log("error occurred")
		if(result){
			return callback(result);
		}
	});
}

exports.purchaseIndex = async (req,res,next) => {	 
	/*Limited access*/
	const userLoginCheck=await authentication(req.session);
    if(userLoginCheck===false){
    	res.redirect('/login');
    	return false;
    }
	/*Limited access*/ 
	if (req.session.csrf === undefined) 
	    req.session.csrf = randomBytes(100).toString('base64');
	// return false;
	// console.log(req.session.loggedin,req.session.token);
    res.render('purchase',{pageTitle:"YawLife - LifeCoin Pre-Sale", formErrorMessages: [], oldInputs: {ethereum_address:'',token: req.session.csrf,loggedin:req.session.userInfo.loggedin,loginToken:req.session.userInfo.token,email:req.session.userInfo.email}});
}

