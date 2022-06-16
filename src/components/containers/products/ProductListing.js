import React , { useEffect, useState } from "react";
import { useConfirm } from 'material-ui-confirm';
import Main from '../../Layout/Main';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid'; 
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { GetProductList, DeleteProduct ,ViewProduct } from '../../services/Services';

const ProductListing = ()=> {
  const [row,setRow] = useState([]);
   const confirm = useConfirm();
  const [showmsg,setShowmsg] = useState('');
  const [loading,setLoading] = useState(false);
  const [msgdisplay,setMsgdisplay] = useState(false);
  const [open,setOpen] = useState(true);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'productName', headerName: 'Product Name', width: 200,height: '500px' },
    { field: 'productModel', headerName: 'Product Model', width: 200 },
    { field: 'productPrice', headerName: 'Product Price', width: 200 ,height: '500px'},
    { field: 'productimage', headerName: 'Product Image',renderCell: (params)=>{
      return (  <div style={{height: "100%",width:"100%"}}>
        <img src={'product_images/'+params.row.productimage} alt={params.row.productimage} style={{height: "100%"}} /> </div>
      )
    } },
    {
      field: 'Delete',
      headerName: 'Delete', 
      width: 160,
        renderCell: (params) => {
          return <Button onClick={(event) => {
              removeClick(event, params);
            }}
          >Remove</Button>;
      }
    },{
      field: 'View',
      headerName: 'View', 
      width: 160,
        renderCell: (params) => {
          return <Button onClick={(event) => {
              viewClick(event, params);
            }}
          >View</Button>;
      }
    }
  ];
  const tokenItem=localStorage.getItem('token');

  const removeClick = (event, params) => {
    confirm({ description: 'You want to delete this item?!' })
      .then((res) => { 
          event.stopPropagation();
          setLoading(true);
          DeleteProduct(tokenItem,{id:params.id},(responce)=>{
            console.log(responce.message);
            setRow(responce.success);
            setShowmsg(responce.message);
            setMsgdisplay(true);
            setLoading(false)
          })

       })
      .catch(() => { 
          setLoading(false)
       });    
  };

  const viewClick = (event, params) => {
    event.stopPropagation();
    ViewProduct(tokenItem,{id:params.id},(responce)=>{

    })
  }
  const editClick = (event, params) => {
    alert('This is edit click');
  }
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    GetProductList(tokenItem, (responce)=>{
      if(responce.result && responce.result){
        console.log(responce.result,"12*****")
        setRow(responce.result);
      }    
    });
  }, []);
 
  return (
    <Main>
    <>    
    <Collapse in={msgdisplay}>
    {showmsg && showmsg?(<Alert  onClose={() => setMsgdisplay(false)} severity="success">{showmsg && showmsg}</Alert>):''}</Collapse></>
     <div style={{ height: 400, width: '100%' }}>      
      <DataGrid
        rows={row}
        columns={columns}
        id="_id"
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={loading}       
      />
    </div>
    </Main>
  );
}
export default ProductListing;