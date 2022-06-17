import React , { useEffect, useState } from "react";
import { useConfirm } from 'material-ui-confirm';
import Main from '../../Layout/Main'; 
import { useParams } from 'react-router-dom';
import { ViewProduct ,CurrentRole } from '../../services/Services';

const SingleProduct = ()=> {  
  const params = useParams()
  const [rolePremission,setRolePremission] = useState(false);
  const [string,setString]=useState();
 // console.log(location.pathname)
  useEffect(() => {
  const token=localStorage.getItem('token');

   CurrentRole(token, (res)=>{
      console.log(res.result,"res");
      if(res.result =="User")
      {
        setRolePremission(false);
      }else{
        setRolePremission(true);
      }
    }); 
    // const token=localStorage.getItem('token');
    ViewProduct(token,params.slug,(responce)=>{
      console.log(responce.result,'dsfs')
      setString(responce.result)
    })    

  }, []);
 
  return (
    <Main>{rolePremission?(<>
     {string==null?('No matching record'):JSON.stringify(string)}
     </>):("Sorry You have limited premission")}
    </Main>
  );
}
export default SingleProduct;