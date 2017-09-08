import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import CreateJob from './create';
import ListJobs from './list';
import UpdateJob from './update';
import GoogleSignIn from './welcome';
import { getUser } from '../actions';
import Home from './home';
import {Navbar,NavItem} from 'react-materialize';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class App extends React.Component {
    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            this.props.dispatch(getUser(accessToken));
        }
    }
    render() {

        if (!this.props.userLoggedIn) {
            return (
                <section className="login-page">
                    <GoogleSignIn />
                </section>
            );
        }
        return (

            <section className="MainPage">
                {/* <Home /> */}
                 <Navbar brand='logo' left>              
             <NavItem href='/create'>Create</NavItem>
	         <NavItem href='/list'>View All</NavItem>
              <NavItem href='/api/auth/logout'>Sign Out</NavItem>
             </Navbar> 
             {/* {this.props.children}
        <Route exact path="/" component={Home}/>
        <Route path="/update" component={UpdateJob}/> 
        <Route path="/list" component={ListJobs}/>
        <Route path="/create" component={CreateJob}/>
        <Route path="/home" component={Home}/>  */}

            </section>
        );
    }
}

const mapStateToProps = state => ({
    userLoggedIn: state.userLoggedIn,
    // currentUser:state.currentUser,
});
export default connect(mapStateToProps)(App);
