import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
//import Header from './header';
//import SignOut from './sign-out';
//import AppInfo from './app-info';
import CreateJob from './create';
import GoogleSignIn from './welcome';
import {getUser} from '../actions';


class App extends React.Component {
    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            this.props.dispatch(getUser(accessToken));
        }
    }
    render() {
        if (!this.props.currentUser) {
            return (
                <section className="login-page">
            
             
                    <GoogleSignIn />
                </section>
            );
        }
        return (
            <section className="create-page">
             
                <CreateJob />
  
            </section>
        );
    }
}
const mapStateToProps=state=>({
    currentUser: state.currentUser,
});
export default connect(mapStateToProps)(App);