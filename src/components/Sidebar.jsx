import React from 'react'
import { Link } from 'react-router-dom';
import PrivateComponent from './PrivateComponent';

import useActiveRoute from 'hooks/useActiveRoute';


const Sidebar = () => {
    return (
      <div className="flex h-screen p-4 border-r w-42   border-gray-200 backgroundBlue fixed ">
        <ul>
          <li className="flex mb-8">
            <div className="bg-white shadow-sm p-1 mr-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>  
            <Link to="/Home">
            <button   className="text-white">INICIO</button>
            </Link>
          </li>
          
          <PrivateComponent roleList={['Administrador']}>
          <li className="border-b-2  my-1"></li>
         
          <li className=" mb-8">
            <div className="bg-white shadow-sm p-1 mr-3 rounded-lg float-left">
              <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24"  stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            
            <button className="text-white">USUARIOS</button>
            <div>
              <ul>
                <li className="text-gray-400">
                  <Link className="btn-side" to="/usuarios">Usuarios</Link>
                </li>
              </ul>
            </div>
          </li>
          

          <li className="border-b-2  my-1"></li>

          <li className="mb-8">
            <div className="bg-white shadow-sm p-1 mr-3 rounded-lg float-left">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <button className="text-white">MAESTRAS</button>
            <div>
              <ul>
                <li className="text-gray-400">
                  <Link className="btn-side" to="/products">Productos</Link>
                </li>
              </ul>
            </div>
          </li>
          </PrivateComponent>
          <li className="border-b-2  my-1"></li>
          <PrivateComponent roleList={['Administrador', 'Vendedor']}>
          <li className="mb-8">
            <div className="bg-white shadow-sm p-1 mr-3 rounded-lg float-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <button className="text-white">
              ADMIN VENTAS
            </button>
            <div>
              <ul>
                <li className="text-gray-400">
                  <Link className="btn-side" to='/Sales'>Ventas</Link>
                </li>
              </ul>
            </div>
          </li>
          </PrivateComponent>
        </ul>
      </div>
    );
}
const Ruta = ({ icono, ruta, nombre, usuario }) => {
  console.log('Usuarios', usuario);
  const isActive = useActiveRoute(ruta);
  return (
    <Link to={ruta}>
      <button
        className={`p-1 my-2  bg-${
          isActive ? 'indigo' : 'gray'
        }-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
      >
        {usuario ? (
          <>
            
            {usuario.name}
          </>
        ) : (
          <>
            <i className={`${icono} w-10`} />
            {nombre}
          </>
        )}
      </button>
    </Link>
  );
};
export default Sidebar
