import React ,{useEffect} from 'react';
import About from '../containers/About';
import SignIn from '../containers/SignIn';
import ForgotPasswordFun from '../containers/ForgotPassword';
import Home from '../containers/Home';
import Contact from '../containers/Contact';
import Account from '../containers/Account';
import Profile from '../containers/Profile';
import AddProduct from '../products/AddProduct';
import UserList from '../containers/UserList';
import Blog from '../containers/Blog';
import NoPage from '../containers/Nopage';
import Navbar from './Nav/Navbar';
import Protected from '../AuthProtected/Protected';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Header() {
  const localToken=localStorage.getItem('token');
	useEffect (()=>{
    // alert(localToken)
  })
  return (
  	<>
  	<Router>
      <Navbar />    
      <Switch>  

        <Route path="/About" component={About} roles={['Admin','User']}  />
        <Route path="/Blog" component={Blog}  roles={['Admin','User']} />
        <Route path="/Contact" component={Contact}  />        
        <Protected path="/Profile" component={Profile} type="private" roles={['Admin','User']} />
        <Protected path="/dashboard" component={UserList} type="private" roles={['Admin']} /> 
        <Protected path="/Account" component={Account} type="private" roles={['Admin','User']} />
        <Protected path="/Signup" component={Home}  type="public"  roles={['Admin','User']} />
        <Protected path="/Login" component={SignIn} type="public" roles={['Admin','User']} />       
        <Protected path="/add-product" component={AddProduct} type="private"  />       
        <Protected path="/Forgot-password" component={ForgotPasswordFun} type="public"  isAuthUser={localToken}  roles={['Admin','User']} />)        
             
        <Route path="*" component={NoPage}  />
      </Switch>
    </Router>
    </>
  );
}
export default Header;