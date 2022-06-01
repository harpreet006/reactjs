import React from "react";
import Grid from '@mui/material/Grid';
import Main from '../Layout/Main'
function Nopage() {
  return (
    <Main>
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
         Sorry Page not found
        </Grid>
      </Grid> 
     
    </Main>
  );
}
export default Nopage;