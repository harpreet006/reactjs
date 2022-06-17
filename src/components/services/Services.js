import React from "react";
import axios from 'axios';
const base_Url='http://localhost:8000/';
export async function RegisterUser(params,callback) {
    if(params.firstName==""){    
        callback({'error':[{firstName:"Please enter your first name"}]});
        return false;
    }
    if(params.lastName==""){
        callback({'error':[{lastName:"Please enter your last name"}]}); 
        return false;
    }
    if(params.email==""){
        callback({'error':[{email:"Please enter your email address"}]});
        return false;
    }else{
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regex.test(params.email) === false){
            callback({'error':[{email:"Please enter a valid email address"}]});
        return false;
        }
    }
    if(params.password==""){
        callback({'error':[{password:"Please enter your password"}]});
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

export async function CurrentRole(header,callback) {
    const AuthStr = 'Bearer ' + header;
    await axios.get(base_Url+'getRole',{
        headers: { 'Content-Type': 'application/json','authorization':AuthStr }
    }).then(response =>{
        console.log(response);
        if(response.data.status=="success"){
            callback({'status':response.data.status,'result':response.data.result});
        }else{
            callback({'status':response.data.status,'result':'','message':response.data.message});
        }
    }).catch(err =>{
        // callback({'status':'error','message':"Something went wrong"});
    })
    // return "sdfsdf";
}

export async  function fileUploadToServer(header,compressedFile,callback){
    const AuthStr = 'Bearer ' + header;
    await axios.post(base_Url+'fileUpload',compressedFile ,{
        headers: { 'Content-Type': 'application/json','authorization':AuthStr }
    }).then(response =>{
        if(response.data.status=="success"){
            callback({'status':response.data.status,'message':response.data.message});
        }else{
            callback({'status':response.data.status,'message':response.data.message});
        }
    }).catch(err =>{
        callback({'status':'error','message':"Something went wrong"});
    })
}


export async function ProductAdd(header,params,callback) {
    if(params.productName==""){    
        callback({'error':[{productName:"Please enter your product name"}]});
        return false;
    }
    if(params.productModel==""){
        callback({'error':[{productModel:"Please enter model name"}]}); 
        return false;
    }
    if(params.productPrice==""){
        callback({'error':[{productPrice:"Please enter product price"}]});
        return false;
    }
    const AuthStr = 'Bearer ' + header;
    await axios.post(base_Url+'addproduct', params, {
       headers: { 'Content-Type': 'multipart/form-data','authorization':AuthStr }
    }).then(response =>{

        // callback({'success':response.data.success});
    }).catch(err =>{
        // callback({'error':err});
        console.log(err);
    })
}

export async function GetUserList(header,callback) {
    const AuthStr = 'Bearer ' + header;
    await axios.get(base_Url+'getusers', {
        headers: { 'Content-Type': 'application/json','authorization':AuthStr }
    }).then(response =>{
        callback({'success':response.data.success});
    }).catch(err =>{
        callback({'error':err});
        console.log(err);
    })
}

export async function ViewProduct(header,slug,callback) {
    const AuthStr = 'Bearer ' + header;
    await axios.get(base_Url+'singlePage', {params: {slug:slug},
        headers: { 'Content-Type': 'application/json','authorization':AuthStr }
    }).then(response =>{
        if(response.data.status=="success"){
            callback({'result':response.data.result,message:''});
        }else{
            callback({'result':null,message:response.data.message});
        }
    }).catch(err =>{
        callback({'result':null,message:err})
        console.log(err);
    })
}

export async function GetProductList(header,callback) {
    const AuthStr = 'Bearer ' + header;
    await axios.get(base_Url+'getproducts', {
        headers: { 'Content-Type': 'application/json','authorization':AuthStr }
    }).then(response =>{
        callback({'result':response.data.result});
    }).catch(err =>{
        callback({'error':err});
        console.log(err);
    })
}




export async function DeleteUser(header,userId,callback) {
    const AuthStr = 'Bearer ' + header;
    await axios.post(base_Url+'deleteUser',userId, {
        headers: { 'Content-Type': 'application/json','authorization':AuthStr }
    }).then(response =>{
        callback({'success':response.data.success,'message':response.data.message});
    }).catch(err =>{
        callback({'error':err});
        console.log(err);
    })
}


export async function DeleteProduct(header,userId,callback) {
    const AuthStr = 'Bearer ' + header;
    await axios.post(base_Url+'deleteProduct',userId, {
        headers: { 'Content-Type': 'application/json','authorization':AuthStr }
    }).then(response =>{
        callback({'success':response.data.success,'message':response.data.message});
    }).catch(err =>{
        callback({'error':err});
        console.log(err);
    })
}






export async function ForgotPassword(params,callback) {
    if(params.email==""){    
        callback({'error':[{email:"Please enter your email address"}]});
        return false;
    }else{
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regex.test(params.email) === false){
            callback({'error':[{email:"Please enter a valid email address"}]});
            return false;
        }
    }

    await axios.post(base_Url+'forgotPassword',params, {
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>{
        callback(response.data);
    }).catch(err =>{
        callback({'error':'error','message':err});
        console.log(err);
    })

}


export async function UserLogin(params,callback) {
    console.log(params.email,"sdfsdf")
    if(params.email==""){       
        callback({'error':[{email:"Please enter your email address"}]});
        return false;
    }else{
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regex.test(params.email) === false){
            callback({'error':[{email:"Please enter a valid email address"}]});
            return false;
        }
    }
    // console.log('***');
    if(params.password==""){    
        callback({'error':[{password:"Please enter your password"}]});
        return false;
    }

    await axios.post(base_Url+'userLogin',params, {
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>{
        callback(response.data);
    }).catch(err =>{
        callback({'error':'error','message':err});
        console.log(err);
    })
}



