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
import Home from './home';
//import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


class App extends React.Component {
    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            this.props.dispatch(getUser(accessToken));
        }
    }
    render (){
     
//         let section;
//         if (!this.props.currentUser) {
//            section= (
//                 <section className="login-page">
//               <GoogleSignIn />
//                 </section>
//             );
//         } else
//         section=(
//             <section className="MainPage">
//                 <CreateJob/>
//                 <ListJobs/>
//                 <UpdateJob/>

//             </section>
//         );
//            return (  <nav>
//     <div class="nav-wrapper">
//       <a href="#" class="brand-logo right">Logo</a>
//       <ul id="nav-mobile" class="left hide-on-med-and-down">
//         <NavLink to="/create">Create Job</NavLink>
//         <NavLink to="/">Update Job</NavLink>
//         <NavLink to ="/submit">Veiw All</NavLink>
//       </ul>
//     </div>
//     {section}
//   </nav>
//         )

console.log(this.props.currentUser);
if (!this.props.currentUser) {
    return (
                <section className="login-page">
              <GoogleSignIn />
                </section>
    );
    } else

    return (

            <section className="MainPage">
             <Home/>  
                </section>
        
    );
   }
}

const mapStateToProps=state=>({
    currentUser: state.currentUser,
});
export default connect(mapStateToProps)(App);
