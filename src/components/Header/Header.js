import React ,{useEffect} from 'react';
import About from '../containers/About';
import SignIn from '../containers/SignIn';
import ForgotPasswordFun from '../containers/ForgotPassword';
import Home from '../containers/Home';
import Contact from '../containers/Contact';
import Account from '../containers/Account';
import Profile from '../containers/Profile';
// import Dashboard from '../containers/Dashboard';
import UserList from '../containers/UserList';
import Blog from '../containers/Blog';
import NoPage from '../containers/Nopage';
import Navbar from './Nav/Navbar';
import Protected from '../AuthProtected/Protected';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Header() {
	useEffect (()=>{
    console.log('')
  })
  return (
  	<>
  	<Router>
      <Navbar />    
      <Switch>  

        <Route path="/Signup" component={Home} />
        <Route path="/About" component={About} />
        <Route path="/Blog" component={Blog} />
        <Route path="/Contact" component={Contact} />        
        <Route path="/Profile">
          <Protected Com={Profile} />
        </Route>
        <Route path="/dashboard">
          <Protected Com={UserList} />
        </Route>
        <Route path="/Login">
          <Protected Com={SignIn} />
        </Route>        
        <Route path="/Forgot-password" component={ForgotPasswordFun} />
        <Route path="/Account" component={Account} />
        <Route path="*" component={NoPage}  />
      </Switch>
    </Router>
    </>
  );
}
export default Header;