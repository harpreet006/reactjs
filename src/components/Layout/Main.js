import React from "react";
import Container from '@mui/material/Container';

function Main({children}) {
  return (
    <Container>
      {children}
    </Container>
  );
}
export default Main;