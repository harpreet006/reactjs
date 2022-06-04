var { randomBytes } = require('crypto');
const {connection} = require('../services/db');
const User = require('../models/Users');
var md5 = require('md5');
const jwt = require('jsonwebtoken')
const userModel= new User();
// const {generateHash,authentication} =  require('../services/helper');
// const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
var log = require('log-to-file');
/**
* This function will show user register form.
*/
exports.registerForm = async (req,res,next) => {
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const email=req.body.email
    const password=req.body.password
    const premission=req.body.premission
    connection.query(userModel.addUser(firstName,lastName,email,md5(password),premission), (err,result) => {
        if(err)
            console.log(err);
        // console.log()
        if(result.insertId>0){
            res.json({success:"User successfully created"});
        }else{
            res.json({error:"!Error"});
        }
    });
    // return false;
}



exports.userLogin = async (req,res,next) => {
    connection.query(userModel.userLogin(req.body.email), (err,result) => {
        if(err)
            res.json({error:"error",message:"Something wrong"})
        if(result.length){
            const password=md5(req.body.password);
            if(result[0].password === password){
                const token = jwt.sign(
                    { user_id: result[0].id },
                        process.env.TOKEN_KEY,
                    {
                        expiresIn: "1h",
                    }
                );
                // save user token
                result[0].token = token;

               res.json({status:"success",result:result[0],message:"successfully"});
            } else{
                res.json({status:"error",result:'',message:"Wrong Password"});
            }
        }else{
            res.json({status:"error",result:result,message:`No matching record with ${req.body.email}`});
        }
    });
}


exports.forgotPassword = async (req,res,next) => {
    connection.query(userModel.forgotPassword(req.body.email), (err,result) => {
        if(err)
            res.json({error:"error",message:"Something wrong"})
        // console.log(result,"OOOOOOOO")
        if(result){
            res.json({status:"success",result:result[0],message:"successfully"});
        }else{
            res.json({status:"error",result:result,message:`Something did wrong`});
        }
    });
}


exports.getUsers = async (req,res,next) => {
    console.log('calling...')
    connection.query(userModel.getUsers(), (err,result) => {
        if(err)
            console.log(err);
        // console.log()
        if(result.length>0){
            res.json({success:result,message:""});
        }else{
            res.json({error:"!Error"});
        }
    });
    // return false;
}

exports.deleteUser = async (req,res,next) => {
    connection.query(userModel.deleteUser(req.body.id), (err,result) => {
        if(err)
            console.log(err);
        if(result){
            connection.query(userModel.getUsers(), (err,result) => {
            if(err)
                console.log(err);
            if(result.length>0){
                res.json({success:result,message:"User successfully deleted"});

            }else{
                res.json({error:"!Error",message:"There is some problem"});
            }
            });

        }else{
            res.json({error:"!Error",message:"There is some problem"});
        }
    });
    // return false;
}



