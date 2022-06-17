import React , { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useConfirm } from 'material-ui-confirm';
import Main from '../Layout/Main';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid'; 
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { GetUserList, DeleteUser ,CurrentRole} from '../services/Services';

const UserList = (props)=> {
  console.log(props.roles,"dfdfdf");
    const history = useHistory();
  const [row,setRow] = useState([]);
   const confirm = useConfirm();
  const [showmsg,setShowmsg] = useState('');
  const [loading,setLoading] = useState(false);
  const [rolePremission,setRolePremission] = useState(false);
  const [msgdisplay,setMsgdisplay] = useState(false);
  const [open,setOpen] = useState(true);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstname', headerName: 'First name', width: 130 },
    { field: 'lastname', headerName: 'Last name', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'premission',
      headerName: 'Permission',
      width: 160
    },
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
    },
    {
      field: 'Edit',
      headerName: 'Edit', 
      width: 160,
        renderCell: (params) => {
          return <Button onClick={(event) => {
              editClick(event, params);
            }}
          >Edit</Button>;
      }
    }
  ];
  const tokenItem=localStorage.getItem('token');

  const removeClick = (event, params) => {
    confirm({ description: 'You want to delete this item?!' })
      .then((res) => { 
          event.stopPropagation();
          setLoading(true);
          DeleteUser(tokenItem,{id:params.id},(responce)=>{
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

  const editClick = (event, params) => {
    alert('This is edit click');
  }
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    CurrentRole(tokenItem, (res)=>{
      console.log(res.result,"res");
      if(res.result =="User")
      {
        setRolePremission(false);
      }else{
        setRolePremission(true);
      }
    })
    GetUserList(tokenItem, (responce)=>{
      if(responce.success && responce.success){
        console.log(responce.success,"12*****")
        setRow(responce.success);
      }    
    });
  }, []);
  

  return (
    <Main>
    <>    
    <Collapse in={msgdisplay}>
    {showmsg && showmsg?(<Alert  onClose={() => setMsgdisplay(false)} severity="success">{showmsg && showmsg}</Alert>):''}</Collapse></>
     {rolePremission?(<div style={{ height: 400, width: '100%' }}>      
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={loading}
      />
    </div>):('Sorry You have limited premission')}
     
    </Main>
  );
}
export default UserList;