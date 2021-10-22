import { useUser } from 'context/userContext';
import React from 'react'
import { Link } from 'react-router-dom'

const PrivateRoute = ({ roleList, children }) => {
    const { userData } = useUser();
    console.log("user data en Private Componet", userData);

    if (roleList.includes(userData.rol)){
        return children; 
    }
    return (
        <div>
            <div>No estás autorizado para ingresar a este sitio</div>
            <Link to='Home'>
            <button className={`text-white p-2 rounded-full m-8  self-end buttonblue`}>Volver al Home</button>
            </Link>
        </div>

    )
    
};

export default PrivateRoute;
