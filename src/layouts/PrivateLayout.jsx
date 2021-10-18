//import React  from 'react';
import React, { useEffect, useState } from 'react';
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import PrivateRoute from 'components/PrivateRoute';
import SidebarResponsive from 'components/SidebarResponsive';
import { useAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import { obtenerDatosUsuario } from 'utils/api';
import { useUser } from 'context/userContext';

const PrivateLayout = (children) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
      const fetchAuth0token = async () => {
          const access = await getAccessTokenSilently({
              audience: 'api-autenticacion',
          });
          localStorage.setItem('token', access);
          await obtenerDatosUsuario((response) => {
              console.log(response);
          },(err)=>{
              console.log(err);
          }

          );
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

    return (
        <div>
                <div >
                    <Navbar />
                    <div className="flex w-screen h-screen">
                        <Sidebar />
                        <SidebarResponsive />
                        <main className="flex w-full ">{children}</main>
                    </div>
                </div>
        </div>
    )
}

export default PrivateLayout