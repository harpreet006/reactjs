const {connection} = require('../services/db');
const User = require('../models/Users');
var userModel = new User(); // TypeError: User is not a constructor
const {generateHash,authentication} =  require('../services/helper');
const {validationResult} = require('express-validator');

/**
* This function will show address form.
*/


exports.addressForm = async (req,res,next) => {
	console.log(req.session);
	/*Limited access*/
	if(req.session.user==""){
		res.redirect('/register');
		return false;
	}
	const userLoginCheck=await authentication(req.session);
	if(userLoginCheck===true){
		res.redirect('/purchase');
		return false
	}
	if (req.session.csrf === undefined)
	    req.session.csrf = randomBytes(100).toString('base64');
    res.render('address',{pageTitle:"YawLife - LifeCoin Pre-Sale", formErrorMessages: [], oldInputs: {ethereum_address:'',token: req.session.csrf}});
}

/**
* This will connect ethereum pubkey to the associated user.
*/
exports.savePubKey = async (req,res,nex) => {
	if (!req.body.csrf){ 
    	console.log(`CSRF token not found..`);
    }
    if (req.body.csrf.trim() !== req.session.csrf){ 
    	console.log(`Mismatch CSRF token..`);
    }

    let errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array());
        return res.status(422).render('address',{pageTitle:"YawLife - LifeCoin Pre-Sale",oldInputs: req.body,formErrorMessages: errors.array()})
    }
    connection.query(userModel.updatePubkey(req.body.pubkey,req.session.user.user_id), (err,result) => {
			if(err){
				console.log(err);
			}
			if(result){				
				res.redirect('/identify');   	
        	}
		});
	}

