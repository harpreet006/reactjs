import React,{ useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Main from '../../Layout/Main'
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
import LoadingSpinner from '../../Helper/LoadingSpinner';
import imageCompression from 'browser-image-compression';
import { ProductAdd ,fileUploadToServer} from '../../services/Services';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// var FormData = require('form-data');
const AddProduct = () => {
  const theme = createTheme();
  const history = useHistory();
  const [productName,setProductName]= useState('');
  const [productModel,setProductModel]= useState('');
  const [productPrice,setProductPrice]= useState('');
  const [productimage,setProductimage]= useState('');
  const [imageset,setImageset]= useState(false);
  const [fielderror,setFielderror]= useState('');
  const [success,setSuccess]= useState('');
  const [spinner,setSpinner]= useState(false);
  const [msgdisplay,setMsgdisplay] = useState(false);
  const [severity,setSeverity] = useState('success');
  
  const saveFile =(e) =>{
    // console.log(e.target.files[0].name);
    setProductimage(e.target.files[0]);
    setImageset(true); // set image is exist
    setFielderror({productimage:""}); // after upload imae remove error message
  }

   
  const handleSubmit = async (event) => {
      event.preventDefault();
      // return false;
      const header=localStorage.getItem('token');
      const object={
        productName: productName,
        productModel: productModel,
        productPrice: productPrice,
        productimage: productimage
      };
      if(object.productName==""){
        setFielderror({productName:"Required field"});
        return false;
      }
      if(object.productModel==""){
        setFielderror({productModel:"Required field"});
        return false;
      }
      if(object.productPrice==""){
        setFielderror({productPrice:"Required field"});
        return false;
      }
      if(imageset==false){
        setFielderror({productimage:"Required field"});
        return false;
      }
      setSpinner(true);
      console.log('originalFile instanceof Blob', object.productimage instanceof Blob); // true
      console.log(`originalFile size ${object.productimage.size / 1024 / 1024} MB`);
    try {
      // console.log(object.productimage,"******")
      const compressedFile = await imageCompression(object.productimage);
      const token=localStorage.getItem('token');
      const formData = new FormData()
      formData.append('selectedFile', compressedFile)
      formData.append('productName', object.productName)
      formData.append('productModel', object.productModel)
      formData.append('productPrice', object.productPrice)
      // return false;
      fileUploadToServer(token,formData,(responce)=>{
        setMsgdisplay(true)
        setSpinner(false);
        if(responce.status=="success"){
          setSuccess(responce.message)
          history.push('/Products');
        }else{
          setSeverity('error');
          setSuccess(responce.message);
        }
      });
    } catch (error) {
      setSeverity('error');
      console.log(error);
    }
  };
  return (
    <Main>
      <>{spinner && spinner?(<LoadingSpinner />):(<Container component="main" maxWidth="sm">
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
    {success && success?(<Alert  onClose={() => setMsgdisplay(false)} severity={severity}>{success && success}</Alert>):''}</Collapse></>
           
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
                  required
                  fullWidth
                  id="productName"
                  helperText={fielderror.productName && fielderror.productName}
                  onChange={(event, value) => {
                    let eventAct=event.target.value.trim();
                    setProductName(eventAct)
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
                  helperText={fielderror.productimage && fielderror.productimage}
                  onChange={(e)=> saveFile(e)}
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
      </Container>)}      
    </>
    </Main>
  );
};

export default AddProduct;