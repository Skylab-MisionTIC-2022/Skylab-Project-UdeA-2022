import React from 'react'
import { GoogleLogout } from 'react-google-login';

const clientID = '842597579262-c1mdsi7ulc4rpf53l6aon3576fnvgfqu.apps.googleusercontent.com';

const Logout = () => {
  
    const onSuccess = (res) => {
        alert("Logout exitoso");
    }
    return (
        <div>
            <GoogleLogout
                clientId={clientID}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            >
            </GoogleLogout>

        </div>
    )
}

export default Logout
