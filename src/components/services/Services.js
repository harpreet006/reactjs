import React from "react";
import axios from 'axios';
const base_Url='http://localhost:8000/';
export async function RegisterUser(params,callback) {

    if(params.firstName==""){    
        callback({'error':[{firstName:"First Name is  empty"}]});
        return false;
    }
    if(params.lastName==""){
        callback({'error':[{lastName:"Last Name is empty"}]}); 
        return false;
    }
    if(params.email==""){
        callback({'error':[{email:"Email is empty"}]});
        return false;
    }
    if(params.password==""){
        callback({'error':[{password:"Password is empty"}]});
        return false;
    }

    await axios.post(base_Url+'adduser', params, {
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>{
        callback({'success':response.data.success});
    }).catch(err =>{
        callback({'error':err});
        console.log(err);
    })
}


export async function GetUserList(callback) {
    await axios.get(base_Url+'getusers', {
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>{
        callback({'success':response.data.success});
    }).catch(err =>{
        callback({'error':err});
        console.log(err);
    })
}


export async function DeleteUser(userId,callback) {
    await axios.post(base_Url+'deleteUser',userId, {
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>{
        callback({'success':response.data.success,'message':response.data.message});
    }).catch(err =>{
        callback({'error':err});
        console.log(err);
    })
}



export async function UserLogin(params,callback) {
    if(params.email==""){    
        callback({'error':[{email:"Email is  empty"}]});
        return false;
    }
    if(params.password==""){    
        callback({'error':[{password:"Password is  empty"}]});
        return false;
    }

    await axios.post(base_Url+'userLogin',params, {
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>{
        console.log(response,"ddddddddd")
        callback({'result':response.result,'message':response.data.message});
    }).catch(err =>{
        callback({'error':'error','message':err});
        console.log(err);
    })
}



