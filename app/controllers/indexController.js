const axios = require("axios");
const QRCode = require('qrcode');
const {connection} = require('../services/db');
const User = require('../models/Users');
const userModel = new User();
const {generateHash,authentication} =  require('../services/helper');
/**
* Will first generate basic token.
* Use basic token with the user email to create check on go aver.
* Use the response url to generate QR Code.
*/

exports.generateCode = async (req,res,next) => {
	/*Limited access*/
	const sessionGlob= req.session;
	const userLoginCheck=await authentication(req.session);
	if(userLoginCheck===true){
		res.redirect('/purchase');
		return false;
	}
	/*Limited access*/
	// let email = req.session.user.email;
	let email = "test@gmail.com";
	// let userId = req.session.user.user_id;
	let userId = 2;
	if(email !== undefined){
		console.log('email: ' + email);
		const url = process.env.API_BASE_URL+process.env.API_CREATE_TOKEN
	    const newHeaders = {
	        "Accept": "application/json",
	        "authorization": "Basic "+process.env.AUTHORIZATION_KEY
	    }
		let response = await axios.get(url,{headers:newHeaders});
		if(response.status == 200){
			let token = response.data.token;
			let createCheckUrl = process.env.API_BASE_URL+process.env.API_CREATE_CHECK;
	    	let requestData = {
	    		"thirdPartyIdentifier":Math.random(),
	    		"groupId":process.env.GROUP_ID,
	    		"email":email,
	    		"language":"en",
                "skipPersonalAccessCode": true,
	    		"returnUrl":process.env.returnUrl
	    	}	    	
	    	let headers = {
	    		"Accept": "application/json",
	    		"authorization": "Bearer "+token
	    	}
	    	let createCheckResponse = await axios.post(createCheckUrl,requestData,{headers:headers});		 
	    	if(createCheckResponse.status == 200){
	    		await makeQRCode(createCheckResponse.data,async function(response){
	    			if(response){
						await validatedStatus(userId,function(valResponce){
							if(valResponce){								
	    						res.render('identify',{pageTitle:"YawLife - LifeCoin Pre-Sale",result:response,oldInputs: {ethereum_address:'',token: req.session.csrf,loggedin:''}});
	    					}
						});
	    			}
	    		});
	    	}
		}else{
			console.log(`err`);
		}
	}else{
		res.send({
			"error": true,
			"message": "Email id not found"
		})
	}
}

/**
* This will take go aver api response and make QR code of the response and send back to function.
*/
function makeQRCode(requestData,callback) {
	let stringdata = JSON.stringify(requestData.url);
	QRCode.toString(stringdata,{type:'terminal'},
	    function (err, QRcode) {	 
	    if(err) return console.log("error occurred")
	});	   
	// Converting the data into base64
	QRCode.toDataURL(requestData.url, function (err, code) {
	    if(err) return console.log("error occurred");	 
	    // Printing the code
	    return callback(code);
	})
}

/**
* Change validated status o to 1
*/
function validatedStatus(userId,callback){
	connection.query(userModel.updateValidated(userId), (err,result) => {
		if(err) return console.log("error occurred")
		if(result){
			return callback(result);
		}
	});
}
/**
* This function shows home page.
*/
/*exports.getHomePage = async (req,res,next) => {
	res.render('register',{pageTitle:"YawLife - LifeCoin Pre-Sale"});
}*/
