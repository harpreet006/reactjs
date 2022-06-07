import React , { useEffect, useState }from "react";
import { useHistory } from "react-router-dom";
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
import { UserLogin } from '../services/Services';


const SignIn = ()=> {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [remember,setRemember] = useState('');
  const [fielderror,setFielderror]= useState('');
  const [showmsg,setShowmsg] = useState('');
  const [msgdisplay,setMsgdisplay] = useState(false);
  const [alerttype,setAlerttype] = useState(false);
  const theme = createTheme();
  const history = useHistory();

  const handleSubmit=(event)=>{
    event.preventDefault();
    const object ={
      email:email,
      password:password
    }
    
    UserLogin(object,(responce)=>{
      /*validation message error display*/
      if(responce.error && responce.error !="undefined"){  
        setFielderror(responce.error[0]); 
        setMsgdisplay(false);
        return false;
      }
      setFielderror('');
      /*validation message error display*/ 
      if(responce.status=="error"){
        setShowmsg(responce.message)
        setMsgdisplay(true);
        setAlerttype(responce.status);
      }
      if(responce.status=="success"){
        setShowmsg(responce.message)
        setMsgdisplay(true);
        setAlerttype(responce.status);
        localStorage.setItem('token', responce.result.token);
        history.push('/dashboard');
      }
    })
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
     // alert(loggedInUser)
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
            <TextField
              error ={fielderror.password && fielderror.password?true:false}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              helperText={fielderror.password && fielderror.password}
              id="password"
              onChange={(event, value) => {
                setPassword(event.target.value)
              }}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              onClick={(event, value) => {                 
                setRemember(event.target.value)
              }}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Home" variant="body2">
                  {"Don't have an account? Sign Up"}
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
export default SignIn;