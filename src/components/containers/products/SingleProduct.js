import React , { useEffect, useState } from "react";
import { useConfirm } from 'material-ui-confirm';
import Main from '../../Layout/Main'; 
import { useParams } from 'react-router-dom'
import { ViewProduct } from '../../services/Services';

const SingleProduct = ()=> {  
 const params = useParams()
 const [string,setString]=useState();
 // console.log(location.pathname)
  useEffect(() => {
    const token=localStorage.getItem('token');
    ViewProduct(token,params.slug,(responce)=>{
      console.log(responce.result,'dsfs')
      setString(responce.result)

    })
    

  }, []);
 
  return (
    <Main>
     {string==null?('No matching record'):JSON.stringify(string)}
    </Main>
  );
}
export default SingleProduct;