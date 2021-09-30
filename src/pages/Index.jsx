import React from 'react'
import Login from '../components/Login'
import '../css/login.css'
import logo from '../media/img/Logo.png'

const Index = () => {
    return (
      
        <div class="backgroundImg">
            <div class="container">
                <div class="d-flex justify-content-center h-100">
                    <div class="card">
                        <div class="card-body">
                            <img class="logo" src={logo} />

                            <h5 class='textLogin'> BIENVENIDO </h5>
                            <div class='buttonLogin'>
                                <Login />
                            </div>




                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
