import React from "react";
import axios from 'axios';

export async function RegisterUser(params,callback) {
    if(params.firstName==""){    
        callback({'error':{firstName:"firstName empty"}});
        return false;
    }
    if(params.lastName==""){
        callback({'error':{lastName:"lastName empty"}}); 
        return false;
    }
    if(params.email==""){
        callback({'error':{email:"email empty"}});
        return false;
    }
    if(params.password==""){
        callback({'error':{password:"password empty"}});
        return false;
    }

    await axios.post('https://httpbin.org/post', params, {
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>{
        callback({'success':response.data.json});
        // console.log(response.data.json);
    }).catch(err =>{
        callback({'error':err});
        console.log(err);
    })
}

