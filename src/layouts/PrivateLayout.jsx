import React, { useEffect, useState }  from 'react';
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'react-loading';
import { obtenerDatosUsuarios } from 'utils/api';
import { useUser } from 'context/userContext'; 


const PrivateLayout = ({ children }) => {

    const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect, logout} = useAuth0();
    const [loadingUserInformation, setLoadingUserInformation] = useState(false); 
    const { setUserData } = useUser(); 

    useEffect(() => {
        const fetchAuth0token = async () => {
            setLoadingUserInformation(true);
            const access = await getAccessTokenSilently({
                audience: 'api-autenticacion',
            });
            localStorage.setItem('token', access);
            console.log(access);

            await obtenerDatosUsuarios((response) => {
                console.log("respuesta de obtener usuarios", response); 
                setUserData(response.data);
                setLoadingUserInformation(false);
            },(err)=>{
                console.log('error', err);
                setLoadingUserInformation(false);
                logout({ returnTo: 'https://pacific-retreat-26412.herokuapp.com/' });
            }

            );   
        };
        if (isAuthenticated) {
            fetchAuth0token();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading || loadingUserInformation) {
        return (
            <div class="flex justify-center">
                <ReactLoading type={"cylon"} color={'#21507A'} height={'20%'} width={'20%'} />
            </div>)
    }
    if (!isAuthenticated) {
        return loginWithRedirect();
    }
    
    return (
        <div>

                <div >
                    <Navbar />
                    <div className="flex w-screen h-screen">
                        <Sidebar />
                        <main className="flex w-full ">{children}</main>
                    </div>
                </div>

        </div>
    )
}

export default PrivateLayout