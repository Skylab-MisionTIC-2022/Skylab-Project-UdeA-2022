import React from 'react'
import { useAuth0, getAccessTokenSilently } from "@auth0/auth0-react";
import { useEffect, useState, useRef } from 'react';

const PrivateRoute = (children) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    useEffect(() => {
        const fetchAuth0token = async () => {
            const access = await getAccessTokenSilently({
                audience: 'api-autenticacion',
            });
            localStorage.setItem('token',access);
            console.log(access);
        }
        if (isAuthenticated) {
            fetchAuth0token();
        }

        
    }, [isAuthenticated, getAccessTokenSilently]);


   
    if (isLoading) {
        return (<div>Inicio session</div>)
    }
    
    return isAuthenticated ? <>{children.children} </>:<div>No estas autorizado</div>
   
}

export default PrivateRoute
