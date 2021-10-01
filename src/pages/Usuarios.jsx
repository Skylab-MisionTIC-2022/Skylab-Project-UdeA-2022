import React, { useState, useEffect} from 'react';
import { Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom";


const usuarios = [
    { nombre: "Paola", apellido: "Avella", correo: "avella.carrero9@gmail.com", rol: "Vendedor", estado: "Pendiente" },
    { nombre: "Juan", apellido: "Avella", correo: "avella.carrero9@gmail.com", rol: "Administrador", estado: "Autorizado" }

]

const Usuarios = () => {
    const [mostrarTabla, setTabla] = useState(false);
    const [usuariosInfo, setUsuariosInfo] = useState([]);
   

    useEffect(() => {
        setUsuariosInfo(usuarios);
        setTabla(false);
    }, []);

    return (
        <div className=" p-8  flex-col  ml-64">
            <h4 class='textblue'> ADMINISTRACION DE USUARIOS</h4>
            <button class='buttonblue aligrigth' onClick={() => { setTabla(true) }}> Crear usuario</button>
            <TablaUsuario listaUsuarios={usuariosInfo} />
            
            {mostrarTabla ? <Redirect to="/usuarios/crear" /> : <p></p>}
            
            
        </div>
    );
}


const TablaUsuario = ({ listaUsuarios }) => {
    const [mostrarTabla, setTabla] = useState(false);
    const [usuarios, setUsuario] = useState();
    let history = useHistory();

    useEffect(() => {
        if(mostrarTabla){
            
        history.push({
            pathname: '/usuarios/editar',
           // search: '?query=abc',
            state: { detail: usuarios }
    
        });
    }
    }, [mostrarTabla]);
   
    return (
        <div>
            <h5 class='textblue'> Usuarios</h5>
            <table class='table table-bordered'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo </th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios.map((usuario) => {
                        return (
                            <tr>
                                <th>{usuario.nombre}</th>
                                <th>{usuario.apellido}</th>
                                <th>{usuario.correo}</th>
                                <th>{usuario.rol}</th>
                                <th>{usuario.estado}</th>
                                <th><button onClick={() => { 
                                     const arr =[usuario.nombre,usuario.apellido,usuario.correo,usuario.rol,usuario.estado]
                                     setTabla(!mostrarTabla); 
                                     setUsuario(arr) }} class='buttonblue'>Editar</button>
            
                                <button class='buttonred'>Eliminar</button></th>
                            </tr>


                        );
                    }

                    )}

                </tbody>
            </table>
        </div>
    );
}



export default Usuarios
