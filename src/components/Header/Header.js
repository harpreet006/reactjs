import React ,{useEffect} from 'react';
import About from '../containers/About';
import SignIn from '../containers/SignIn';
import ForgotPasswordFun from '../containers/ForgotPassword';
import Signup from '../containers/Signup';
import Account from '../containers/Account';
import Profile from '../containers/Profile';
import ContactUs from '../containers/ContactUs';
import AddProduct from '../containers/products/AddProduct';
import HomePage from '../containers/LandingPage/HomePage';
import ProductListing from '../containers/products/ProductListing';
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
        
        <Route path="/About" component={About} roles={['Admin','User']}  breadcrumb="About" />
        <Route path="/Blog" component={Blog}  roles={['Admin','User']} breadcrumb="Blog" />
        <Route path="/Contact" component={ContactUs}  />        
        <Protected path="/Profile" component={Profile} type="private" roles={['Admin','User']} breadcrumb="Profile"  />
        <Protected path="/dashboard" component={UserList} type="private" roles={['Admin']} breadcrumb="Dashboard"  /> 
        <Protected path="/Account" component={Account} type="private" roles={['Admin','User']} breadcrumb="Account" />
        <Protected path="/Signup" component={Signup}  type="public"  roles={['Admin','User']} breadcrumb="Signup" />
        <Protected path="/Login" component={SignIn} type="public" roles={['Admin','User']} breadcrumb="Login" />       
        <Protected path="/Add-Product" component={AddProduct} type="private" breadcrumb="Add-Product" />   
         <Protected path="/Products" component={ProductListing} type="private" breadcrumb="Products" />
        <Protected path="/Forgot-password" component={ForgotPasswordFun} type="public"  isAuthUser={localToken}  roles={['Admin','User']} breadcrumb="Forgot-password" />)
          <Route path="/" component={HomePage} roles={['Admin','User']}  breadcrumb="Home" />
          <Route path="*" component={NoPage}  />
      </Switch>
    </Router>
    </>
  );
}
export default Header;