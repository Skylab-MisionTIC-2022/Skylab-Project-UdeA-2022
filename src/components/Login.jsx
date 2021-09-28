import React from 'react'
import { GoogleLogin } from 'react-google-login';

const clientID = '842597579262-c1mdsi7ulc4rpf53l6aon3576fnvgfqu.apps.googleusercontent.com';
const login = () => {
    
    const onSuccess = (res) => {
        console.log('currentuser', res.profileObj);
        alert("Login exitoso, llamar otra pagina");
    }
    const onFaile = (res) => {
        console.log('Error', res);
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
        </div>
    )
}

export default login
