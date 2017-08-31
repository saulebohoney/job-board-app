import React from 'react';



export default function SignOut() {
    return (
        <div className="google-button">
                <a className="fill-google-button" href={'/api/auth/logout'}>Register/Sign Out!</a>
        </div>);
}