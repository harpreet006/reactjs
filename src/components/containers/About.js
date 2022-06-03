import React , { useEffect, useState }from "react";
import Main from '../Layout/Main';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid'; 
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { GetUserList, DeleteUser } from '../services/Services';

const About = ()=> {
  const [row,setRow] = useState([]);
  const [showmsg,setShowmsg] = useState('');
  const [loading,setLoading] = useState(false);
  const [msgdisplay,setMsgdisplay] = useState(false);
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
      field: 'Route',
      headerName: 'Action', 
      width: 160,
      renderCell: (params) => {
     

      return <Button onClick={(event) => {
          handleClick(event, params);
        }}
      >Remove</Button>;
    }
    }
  ];

  const handleClick = (event, params) => {
    event.stopPropagation();
    setLoading(true)
    DeleteUser({id:params.id},(responce)=>{
      console.log(responce.message);
      setRow(responce.success);
      setShowmsg(responce.message);
      setMsgdisplay(true);
      setLoading(false)
    })
  };

  useEffect(() => {
    GetUserList((responce)=>{
    if(responce.success && responce.success){
      console.log(responce.success,"12*****")
      setRow(responce.success);
    }
    
    
    });
  }, []);
  

  return (
    <Main>
    <><Collapse in={msgdisplay}>
    {showmsg && showmsg?(<Alert  onClose={() => setMsgdisplay(false)} severity="success">{showmsg && showmsg}</Alert>):''}</Collapse></>
     <div style={{ height: 400, width: '100%' }}>      
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={loading}
      />
    </div>
    </Main>
  );
}
export default About;