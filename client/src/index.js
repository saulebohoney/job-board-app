import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import {Provider} from 'react-redux';
import store from './store';
import './index.css';
import UpdateJob from './components/update';
import ListJobs from  './components/list';
//import GoogleSignIn from './components/welcome';
import CreateJob from './components/create';
//import Home from './components/home';
//import GoogleSignOut from './components/sign-out';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';

//import createBrowserHistory from 'history/createBrowserHistory'

//const history = createBrowserHistory()




ReactDOM.render(
  <Provider store={store}>  
    <Router> 
      
     <div>
     
<header>
    <div className="navbar-fixed">
        <nav>
            <div class="nav-wrapper"> <a href='/api/auth/logout' class="brand-logo">Sign Out</a>
                <ul class="right hide-on-med-and-down">  
                </ul>
            </div>
        </nav>
    </div>

    <ul class="side-nav" id="mobile-demo">
         <NavLink exact to="/create">Create Job</NavLink> <br/>
         <NavLink exact to ="/list">View All</NavLink>
        <Route exact path="/" component={App}/>
        <Route path="/update" component={UpdateJob}/> 
        <Route path="/list" component={ListJobs}/>
        <Route path="/create" component={CreateJob}/> 
    </ul>
</header>
</div>
  </Router>
  </Provider>,
  document.getElementById('root')
);

