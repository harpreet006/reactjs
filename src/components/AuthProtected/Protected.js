import React, {useEffect} from "react";
import {useHistory } from "react-router-dom";
function Protected(props) {
  const history = useHistory();
  console.log(history.action,history.location.pathname,"ddddddd");
  useEffect (()=>{
    if(localStorage.getItem('token')){
      history.push('/dashboard')
    }else{
      history.push('/login');
    }
  })
  const Com=props.Com;
  return (
    <>
    <Com />
    </>
  );
}
export default Protected;