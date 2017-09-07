import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import {Provider} from 'react-redux';
import store from './store';
import UpdateJob from './components/update';
import ListJobs from  './components/list';
import GoogleSignIn from './components/welcome';
import CreateJob from './components/create';
import Home from './components/home';
import SignOut from './components/sign-out';
import {Navbar,NavItem} from 'react-materialize';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

//import createBrowserHistory from 'history/createBrowserHistory'

//const history = createBrowserHistory()




ReactDOM.render(
  <Provider store={store}>  
    <Router>
    <div>
    <Navbar brand='logo' left>              
             <NavItem href='/create'>Create</NavItem>
	         <NavItem href='/list'>View All</NavItem>
           <NavItem href='/api/auth/google'>Sign In</NavItem>
             <NavItem href='/api/auth/logout'>Sign Out</NavItem>
             </Navbar>
        
        <Route exact path="/" component={App}/>
        <Route path="/update" component={UpdateJob}/> 
        <Route path="/list" component={ListJobs}/>
        <Route path="/create" component={CreateJob}/>
        <Route path="/home" component={Home}/> 

  </div>
  </Router>
   </Provider>, 
  document.getElementById('root')
);


