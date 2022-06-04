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
import { RegisterUser } from '../services/Services';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Home = () => {
  const theme = createTheme();
  const [firstName,setFirstName]= useState('');
  const [lastName,setLastName]= useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [premission,setPremission]= useState('');
  const [fielderror,setFielderror]= useState('');
  const [success,setSuccess]= useState('');
  const [msgdisplay,setMsgdisplay] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // setFirstName(data.get('firstName'));
    const object={
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      premission: premission,
    };
     
    RegisterUser(object,(responce)=>{
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
    {success && success?(<Alert  onClose={() => setMsgdisplay(false)} severity="success">{success && success}</Alert>):''}</Collapse></>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error ={fielderror.firstName && fielderror.firstName?true:false}  
                  autoComplete="given-name"
                  name="firstName"
                  value={firstName}
                  required
                  fullWidth
                  id="firstName"
                  helperText={fielderror.firstName && fielderror.firstName}
                  onChange={(event, value) => { 
                    setFirstName(event.target.value.trim())
                  }}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error ={fielderror.lastName && fielderror.lastName?true:false}
                  required
                  fullWidth
                  id="lastName"
                  value={lastName}
                  label="Last Name"
                  helperText={fielderror.lastName && fielderror.lastName}
                  onChange={(event, value) => {
                    setLastName(event.target.value.trim())
                  }}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error ={fielderror.email && fielderror.email?true:false}
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(event, value) => {
                    setEmail(event.target.value.trim())
                  }}
                  label="Email Address"
                  helperText={fielderror.email && fielderror.email}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error ={fielderror.password && fielderror.password?true:false}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  helperText={fielderror.password && fielderror.password}
                  onChange={(event, value) => {
                    setPassword(event.target.value)
                  }}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allow" color="primary" name="premission" />}
                  onClick={(event, value) => {
                    setPremission(event.target.value)
                  }}
                  value={premission}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                   
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link  href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
         
      </Container>
    </ThemeProvider>
    </Main>
  );
};

export default Home;