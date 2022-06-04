import React , { useEffect, useState }from "react";
import Main from '../Layout/Main';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid'; 
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ForgotPassword } from '../services/Services';

const ForgotPasswordFun = ()=> {
  const [email,setEmail] = useState('');
  const [fielderror,setFielderror]= useState('');
  const [showmsg,setShowmsg] = useState('');
  const [msgdisplay,setMsgdisplay] = useState(false);
  const [alerttype,setAlerttype] = useState(false);
  const theme = createTheme();

  const handleSubmit=(event)=>{
    event.preventDefault();
    const object ={
      email:email
    }
    
    ForgotPassword(object,(responce)=>{
      /*validation message error display*/
      if(responce.error && responce.error !=""){       
        setFielderror(responce.error[0]);
        setMsgdisplay(false);
        return false;
      }
      setFielderror('');
      setShowmsg(responce.message)
      setMsgdisplay(true);
      setAlerttype(responce.status);            
      /*validation message error display*/ 


    })
    

  }
  useEffect(() => {
    
  }, []);
  

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">      
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
        {showmsg && showmsg?(<Alert  onClose={() => setMsgdisplay(false)} severity={alerttype && alerttype}>{showmsg && showmsg}</Alert>):''}</Collapse></>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error ={fielderror.email && fielderror.email?true:false} 
              margin="normal"
              required
              fullWidth
              helperText={fielderror.email && fielderror.email}
              id="email"
              onChange={(event, value) => {
                setEmail(event.target.value)
              }}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
             
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
            <Grid container>               
              <Grid item>
                <Link href="/Home" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
    </>
  );
}
export default ForgotPasswordFun;