import React from 'react'
import logo from 'media/img/Logo2.png'

const Navbar = () => {
    return (
      <div className="bg-gray-200 flex p-2 shadow-sm sticky top-0" >
        <img src={logo} />
      <div className="flex-grow">
         
        </div>
        
          <div className='buscar mt-2 p-2 ' >
            <input placeholder='Buscar  '  />
            <i className='mt-1 fas fa-search botonGenerico iconoBusqueda'></i>
          </div>
        

        <button className="mx-4 " name="ayuda">
          ayuda
        </button>
        <button className="w-16 text-blue-600 rounded-lg  border-2 border-blue-600 hover:border-gray-300 mx-4 p-2" name="perfil">
        perfil
        </button>
      </div>
    );
}   

export default Navbar
