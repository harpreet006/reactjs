import React,{ useEffect } from "react";
import Container from '@mui/material/Container';
import OneSignal from 'react-onesignal';
import Breadcrumb from '../Helper/Breadcrumbs';
// import runOneSignal from '../Helper/onesignal';

function Main({children}) {
   useEffect(() => {
    // runOneSignal();
  });

  return (
    <Container sx={{padding:'20px'}}>
      <Breadcrumb crumbs='' />
      {children}
    </Container>
  );
}
export default Main;