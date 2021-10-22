import React from 'react'
import logo from 'media/img/Logo2.png'
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { logout } = useAuth0();
  const cerrarsesion =()=>{
    logout({ returnTo: 'https://pacific-retreat-26412.herokuapp.com/' });
    localStorage.setItem('token',null);
  }
    return (
      <div className="bg-gray-200 flex p-1 shadow-sm sticky top-0" >
      <Link to="/Home">
        <img className="-ml-4" src={logo} />
      </Link>
      <div className="flex-grow">
         
        </div>
        
          <div className='buscar mt-2 p-2 ' >
            <input placeholder='Buscar  '  />
            <i className='mt-1 fas fa-search botonGenerico iconoBusqueda'></i>
          </div>
        

        <button className="mx-4 " name="ayuda">
          ayuda
        </button>
        <button className="w-14 text-blue-600 rounded-lg  border-2 border-blue-600 hover:border-gray-300 mx-4 p-2" name="perfil"
        onClick={() => cerrarsesion()}>
         cerrar sesion
        </button>
      </div>
    );
}   

export default Navbar
