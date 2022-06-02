const {connection} = require('../services/db');
const User = require('../models/Users');
var transporter = require('../services/transport');
var userModel = new User();
const jwt = require('jsonwebtoken');
var log = require('log-to-file');
var Globlesession;
// TypeError: User is not a constructor
// const {generateHash,authentication} =  require('../services/helper');
// const {validationResult} = require('express-validator');

/**
* This function will show address form.
*/

exports.realTimeStatus= async (req,res,next)=>{
	let email = Globlesession.email;
	connection.query(userModel.realTimeStatus(email), (err,result) => {
		if(err) return console.log("error occurred")
		if(result){
			if(result[0].realTime==1){
				console.log(result[0].realTime,'real Time status');
				const userAry = {
					"user_id": result[0].user_id,
					"email": result[0].email
				}
				const token = jwt.sign(userAry, process.env.secret_Code, { expiresIn: process.env.tokenLife});

				req.session.userInfo = {loggedin:true,token:token,email:result[0].email};
				req.session.user='';
				Globlesession='';
				return res.json({"realTimeResult": result[0].realTime});
			}else{
				return res.json({"realTimeResult": result[0].realTime});
			}
		}
	});	
}


exports.waitingForm = async (req,res,next) => {	
	Globlesession=req.session.user;
	console.log(Globlesession,"this is session role get request");
	// log(req, 'my-log.log');
	res.render('waiting',{pageTitle:"YawLife - LifeCoin Pre-Sale", formErrorMessages: [], oldInputs: {email:'',password:'',oldPassword:'',token:req.session.csrf}});
}

// Responce array and session array
/*{"statusMessage":{"type":"LiveCheck","id":"12345","groupId":"11111","status":"Completed"}}*/
// user: { user_id: 50, email: 'HJuui45@gmail.com' }

exports.waitingRequest = async (req,res,next) => {
	if(Globlesession==""){
		res.redirect('/waiting');
		return false;
	}
	log("***waitingRequest*****"+JSON.stringify(req.body)+"****waitingRequest****", 'my-log.log');
	if(req.body.statusMessage.status=="Completed"){

		connection.query(userModel.changeRealTime(Globlesession.email), (err,result) => {
			if(err) return console.log("error occurred")
				if(result){
					console.log('update successfully realTime');
				}
		})	
		const userAry = {
		    "user_id": Globlesession.user_id,
		    "email": Globlesession.email
		}
		console.log(userAry,"manually Trigger");
		const token = jwt.sign(userAry, process.env.secret_Code, { expiresIn: process.env.tokenLife});
		req.session.userInfo = {loggedin:true,token:token,email:Globlesession.email};
		req.session.user='';
		console.log(req.session.userInfo,"userInfo");
		res.redirect('/purchase');
	}else{
		console.log(info,"Sorry you are not eligible to participate.");
		let info = await transporter.sendMail({
			from: '"YawLife ☼ LifeCoin" <info@ratemyemail.co>', // sender address
			to: req.session.user.email, // list of receivers
			subject: "Rejected ✔",
			html: "<b>Sorry you are not eligible to participate.</b>", // html body
		});
		console.log(info)
		req.session.user='';
		Globlesession='';
		res.redirect('/address');
	}
}


