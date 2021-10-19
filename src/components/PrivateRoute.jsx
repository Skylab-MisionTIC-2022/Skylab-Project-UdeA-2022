import React, { useEffect, useState, useRef } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'react-loading';
import { obtenerDatosUsuarios } from 'utils/api';
import { useUser } from 'context/userContext'; 

const PrivateRoute = (children) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { setUserData } = useUser(); 

    useEffect(() => {
        const fetchAuth0token = async () => {
            const access = await getAccessTokenSilently({
                audience: 'api-autenticacion',
            });
            localStorage.setItem('token', access);
            console.log(access);

            await obtenerDatosUsuarios((response) => {
                console.log("respuesta de obtener usuarios", response); 
                setUserData(response.data);
            },(err)=>{
                console.log(err);
            }

            );
            
        };
        if (isAuthenticated) {
            fetchAuth0token();
        }


    }, [isAuthenticated, getAccessTokenSilently]);



    if (isLoading) {
        return (
            <div class="flex justify-center">
                <ReactLoading type={"cylon"} color={'#21507A'} height={'20%'} width={'20%'} />
            </div>)
    }

    return isAuthenticated ? <>{children.children} </> : <div>No estas autorizado</div>

}

export default PrivateRoute;
