import React from "react";
import { Redirect, Route } from "react-router-dom";


const Protected = props => {
  const { type } = props;
  const isAuthUser=localStorage.getItem('token');
  if ((type === "public" && (isAuthUser && isAuthUser !="")==true) ) return <Redirect to="/dashboard" />;
  else if (type === "private" && !(isAuthUser && isAuthUser !="")) return <Redirect to="/login" />;

  // console.log('ddddddd')
  return <Route {...props} />;
};




export default Protected;