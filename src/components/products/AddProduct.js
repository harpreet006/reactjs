import React,{ useEffect, useState } from "react";
import Main from '../Layout/Main'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ProductAdd } from '../services/Services';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AddProduct = () => {
  const theme = createTheme();
  const [productName,setProductName]= useState('');
  const [productModel,setProductModel]= useState('');
  const [productPrice,setProductPrice]= useState('');
  const [productimage,setProductimage]= useState('');
  const [fielderror,setFielderror]= useState('');
  const [success,setSuccess]= useState('');
  const [msgdisplay,setMsgdisplay] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const object={
      productName: productName,
      productModel: productModel,
      productPrice: productPrice,
      productimage: productimage
    };
     
    ProductAdd(object,(responce)=>{
      if(responce.error && responce.error !=""){       
          setFielderror(responce.error[0]);
          setMsgdisplay(false);
          // console.log(error)
        }
        // console.log(success,"****");
        if(responce.success && responce.success){         
          setSuccess(responce.success);
          setMsgdisplay(true);
          console.log(responce,"*****")
          setFielderror('');
        }
    });

  };
  return (
    <Main>
      <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <><Collapse in={msgdisplay}>
    {success && success?(<Alert  onClose={() => setMsgdisplay(false)} severity="success">{success && success}</Alert>):''}</Collapse></>
           
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}  direction="column">
              <Grid item xs={12} sm={12}>
                <TextField
                  error ={fielderror.productName && fielderror.productName?true:false}  
                  autoComplete="given-name"
                  name="productName"
                  value={productName}
                  required
                  fullWidth
                  id="productName"
                  helperText={fielderror.productName && fielderror.productName}
                  onChange={(event, value) => {   
                    setProductName(event.target.value.trim())
                  }}
                  label="Product Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  error ={fielderror.productModel && fielderror.productModel?true:false}
                  required
                  fullWidth
                  id="productModel"
                  value={productModel}
                  label="Product Model"
                  helperText={fielderror.productModel && fielderror.productModel}
                  onChange={(event, value) => {
                    setProductModel(event.target.value.trim())
                  }}
                  name="productModel"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error ={fielderror.productPrice && fielderror.productPrice?true:false}
                  required
                  fullWidth
                  id="productPrice"
                  value={productPrice}
                  onChange={(event, value) => {
                    setProductPrice(event.target.value.trim())
                  }}
                  label="Product Price"
                  helperText={fielderror.productPrice && fielderror.productPrice}
                  name="productPrice"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error ={fielderror.productimage && fielderror.productimage?true:false}
                  required
                  fullWidth
                  name="productimage"
                  type="file"
                  value={productimage}
                  helperText={fielderror.productimage && fielderror.productimage}
                  onChange={(event, value) => {
                    setProductimage(event.target.value)
                  }}
                  id="productimage"
                  autoComplete="productimage"
                />
              </Grid>              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Add Product
            </Button>             
          </Box>
        </Box>         
      </Container>
    </>
    </Main>
  );
};

export default AddProduct;