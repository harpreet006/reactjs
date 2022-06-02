var { randomBytes } = require('crypto');
const {connection} = require('../services/db');
const User = require('../models/Users');
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
    connection.query(userModel.addUser(firstName,lastName,email,password,premission), (err,result) => {
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
exports.getUsers = async (req,res,next) => {
    console.log('calling...')
    connection.query(userModel.getUsers(), (err,result) => {
        if(err)
            console.log(err);
        // console.log()
        if(result.length>0){
            res.json({success:result});
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
        // console.log()
        if(result.length>0){
            res.json({success:result});
        }else{
            res.json({error:"!Error"});
        }
    });
    // return false;
}



