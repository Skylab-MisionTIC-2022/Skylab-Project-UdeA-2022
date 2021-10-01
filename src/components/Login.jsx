import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';



const clientID = '842597579262-c1mdsi7ulc4rpf53l6aon3576fnvgfqu.apps.googleusercontent.com';
const Login = () => {

    const[home, setHome]= useState(false);   
   
    const onSuccess = (res) => {
        setHome(true);
    }
    const onFaile = (res) => {
        setHome(false);
    }
    return (
        <div>
            <GoogleLogin
                clientId={clientID}
                buttonText="Iniciar sesion con Google"
                onSuccess={onSuccess}
                onFailure={onFaile}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            {home ? <Redirect to="/Home" /> : <div></div>}
        </div>
    )
}

export default Login
