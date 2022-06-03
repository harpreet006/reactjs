var { randomBytes } = require('crypto');
const {connection} = require('../services/db');
const User = require('../models/Users');
var md5 = require('md5');
// const jwt = require('jsonwebtoken')
const userModel= new User();
// const {generateHash,authentication} =  require('../services/helper');
// const {validationResult} = require('express-validator')
// const bcrypt = require('bcrypt');
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
        // console.log(result,"OOOOOOOO")
        if(result.length){
            res.json({result:result[0],message:"successfully"});
        }else{
            res.json({result:result,message:`No matching record with ${req.body.email}`});
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



