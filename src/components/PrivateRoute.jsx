import React from 'react'
import { useAuth0, getAccessTokenSilently } from "@auth0/auth0-react";
import { useEffect, useState, useRef } from 'react';
import ReactLoading from 'react-loading';

const PrivateRoute = (children) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    useEffect(() => {
        const fetchAuth0token = async () => {
            const access = await getAccessTokenSilently({
                audience: 'api-autenticacion',
            });
            localStorage.setItem('token', access);
            console.log(access);
        }
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

export default PrivateRoute
