import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
//import CreateJob from './create';
//import ListJobs from './list';
//import UpdateJob from './update';
import GoogleSignIn from './welcome';
import {getUser} from '../actions';
import Home from './home';
//import SignOut from './sign-out';
//import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
//import './index.css';

import {Provider} from 'react-redux';
// import store from './store';

import UpdateJob from './update';
import ListJobs from  './list';
//import GoogleSignIn from './components/welcome';
import CreateJob from './create';
//import Home from './components/home';
//import GoogleSignOut from './components/sign-out';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';


class App extends React.Component {
    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            this.props.dispatch(getUser(accessToken));
        }
    }
    render (){
 
if (!this.props.currentUser) {
    return (
                <section className="login-page">
                <header>
                         <div className="navbar-fixed">
                            <nav>
                              <div className="nav-wrapper"> 
                                 <a href='/' className="brand-logo right">Job-Board-App</a>  
                                <ul className="left" id="mobile-demo">
                           <li> <a className="fill-google-button" href={'/api/auth/google'}><img className="google-logo" src="../../images/google-logo.png" alt="Google G logo"/>Register/Sign in INTO THIS APP!</a></li>
                                 </ul>

                               </div>
                              </nav>
                            </div>  
                    </header> 
                </section>
    );
    } 
    return (

    <section className="MainPage">
         <nav>
    <div class="nav-wrapper">
      <a href="#" className="brand-logo right">Job-Board-App</a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li><a href="/create">Create Job</a></li>
        <li><a href="/list">View All</a></li>
        <li> <a href='/api/auth/logout'>Sign Out</a> </li>
    </ul>
    </div>
  </nav>
        
                {/* <header>
    <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper"> 
                   <a href='/' className="brand-logo right">Job-Board-App</a>   
                 <ul className="left" id="mobile-demo">
                        <li><Home/></li>
                    <li> <NavLink exact to="/create">Create Job</NavLink> </li>
                   <li>  <NavLink exact to ="/list">View All</NavLink> </li>
                   <li><a href='/api/auth/logout'>Sign Out</a></li>  
              </ul>

            </div>
        </nav> 
 </div> 

</header>   */}
</section>
         );
   }
}

const mapStateToProps=state=>({
    currentUser: state.currentUser,
});
export default connect(mapStateToProps)(App);
