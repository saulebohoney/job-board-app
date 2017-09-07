import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
//import CreateJob from './create';
//import ListJobs from './list';
//import UpdateJob from './update';
import GoogleSignIn from './welcome';
import { getUser } from '../actions';
import Home from './home';


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
                <Home />

            </section>
        );
    }
}

const mapStateToProps = state => ({
    userLoggedIn: state.userLoggedIn,
});
export default connect(mapStateToProps)(App);
