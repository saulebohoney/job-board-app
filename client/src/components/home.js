import React from 'react';
import {connect} from 'react-redux';
import GoogleSignIn from './welcome';

class Home extends React.Component {
//     render(){
//         let googleSignIn;
//         if (!this.props.currentUser) {
//         googleSignIn= (
//                 <section className="login-page">
//               <GoogleSignIn />
//                 </section>
//     );
//     } 

//     return (
            
//             <section className="MainPage">
//              <h3>Welcome!</h3>
//              {googleSignIn}
//                 </section>
        
//     );
//    }
// }
    


render(){
    return(
            <div>
                <h3>Welcome</h3>
                  <p class="flow-text">I am Flow Text</p>
                </div>
        );
    }

}

export default Home;