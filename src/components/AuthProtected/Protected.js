import React , {useState,useEffect} from 'react';
import { Redirect, Route } from "react-router-dom";
// import { CurrentRole } from '../services/Services';

const Protected =  (props)=> {
  // const [activeRole,setActiveRole]=useState();
  /*useEffect(()=>{
    async function fetchMyAPI() {
      await CurrentRole(localStorage.getItem('token'),(responce)=>{
        // return responce.result;
        setActiveRole(responce.result)
      }); 
    }
    fetchMyAPI();
  })*/
  const isAuthUser=localStorage.getItem('token');
    const { type } = props;
    if ((type === "public" && (isAuthUser && isAuthUser !="")==true)) return <Redirect to="/dashboard" />;    
    else if (type === "private" && !(isAuthUser && isAuthUser !="")) return <Redirect to="/login" />;
    return <Route {...props} />;

};

export default Protected;
