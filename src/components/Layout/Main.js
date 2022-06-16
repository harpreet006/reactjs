import React from "react";
import Container from '@mui/material/Container';
import Breadcrumb from '../Helper/Breadcrumbs'

function Main({children}) {
  return (
    <Container sx={{padding:'20px'}}>
      <Breadcrumb crumbs='' />
      {children}
    </Container>
  );
}
export default Main;