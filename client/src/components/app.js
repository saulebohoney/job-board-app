import React from 'react';
import {connect} from 'react-redux';
import * as Cookies from 'js-cookie';
//import Header from './header';
//import SignOut from './sign-out';
//import AppInfo from './app-info';
import CreateJob from './create';
import ListJobs from './list';
import UpdateJob from './update';
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
        return
     
        let section;
        if (!this.props.currentUser) {
           section= (
                <section className="login-page">
              <GoogleSignIn />
                </section>
            );
        } else
        section=(
            <section className="CreateJob">
             
                <CreateJob/>
                <ListJobs/>
                <UpdateJob/>

            </section>
        );

//      return (<nav>
//     <div class="nav-wrapper">
//       <a href="#" class="brand-logo">Logo</a>
//       <ul id="nav-mobile" class="right hide-on-med-and-down">
//         <li><a href="sass.html">Sass</a></li>
//         <li><a href="badges.html">Components</a></li>
//         <li><a href="collapsible.html">JavaScript</a></li>
//       </ul>
//     </div>
//     {section}
//   </nav>)
        }
}
const mapStateToProps=state=>({
    currentUser: state.currentUser,
});
export default connect(mapStateToProps)(App);
