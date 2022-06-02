import React , { useEffect, useState }from "react";
import Main from '../Layout/Main';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid';
import { GetUserList, DeleteUser } from '../services/Services';

const About = ()=> {
  const [row,setRow] = useState([]);
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
      description: 'alllow or null',
      sortable: false,
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
      >>Click</Button>;
    }
    }
  ];

  const handleClick = (event, params) => {
    event.stopPropagation();
    DeleteUser({id:params.id},(responce)=>{
      console.log(responce)
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
    <></>
     <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
    </Main>
  );
}
export default About;