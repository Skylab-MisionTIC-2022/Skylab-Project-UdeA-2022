import React from 'react'
import logo from 'media/img/Logo.png'

const Navbar = () => {
    return (
      <div className="bg-gray-200 flex p-2 shadow-sm sticky top-0" >
        <img className="flex-grow h-12 mr-96 -ml-20" src={logo} />
      <div className="flex">
          <input className buscar="mx-4 p-2  " type="search" placeholder="search" />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
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
