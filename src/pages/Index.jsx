import React from 'react'
import '../css/login.css'
import logo from '../media/img/Logo.png'
import { useAuth0 } from "@auth0/auth0-react";

const Index = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <div class="backgroundImg">
            <div class="container">
                <div class="d-flex justify-content-center h-100">
                    <div class="card">
                        <div class="card-body">
                            <img class="logo" src={logo} />

                            <h5 class='textLogin'> BIENVENIDO </h5>
                            

                            <button onClick={() => loginWithRedirect()}>Log In</button>;


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
