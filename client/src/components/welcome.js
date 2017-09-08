import React from 'react';
import './css/welcome.css';


export default function GoogleSignIn() {
    return (
        <div className="google-button">
                <a className="fill-google-button" href={'/api/auth/google'}><img className="google-logo" src="https://camo.githubusercontent.com/da18dfde046310c33010757e0b1d2a1f6c95b5d7/68747470733a2f2f646576656c6f706572732e676f6f676c652e636f6d2f6163636f756e74732f696d616765732f7369676e2d696e2d776974682d676f6f676c652e706e67" alt="Google G logo"/></a>
        </div>);
}