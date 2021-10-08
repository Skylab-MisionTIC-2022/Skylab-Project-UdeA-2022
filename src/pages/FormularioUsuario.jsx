import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


const FormularioUsuario = () => {

    const [mostrarTabla, setTabla] = useState(false);



    useEffect(() => {
        setTabla(false);
    }, []);

    return (
        <div className="flex h-full w-full flex-col items-center justify-start p-8 ml-64">
            <h4 className='text-3xl font-extrabold text-gray-900'>
                Administración de usuario
            </h4>
            <button class='buttonblue aligrigth' onClick={() => { setTabla(true) }}> Ver usuarios</button>
            {mostrarTabla ? <Redirect to="/usuarios" /> : <p></p>}
            <h5 class='textblue'> Crear usuario</h5>
            <form>
                <div class="row">
                    <div class="col">
                        <label for="name">Nombre</label>
                        <input type="text" class="form-control" />
                    </div>
                    <div class="col">
                        <label for="name">Primer Apellido</label>
                        <input type="text" class="form-control" />
                    </div>

                </div>
                <div class="row">
                    <div class="col">
                        <label for="email">Correo</label>
                        <input type="email" class="form-control" />
                    </div>

                    <div class="col">

                        <label for="estado">Estado</label>
                        <select class="form-control">
                            <option>Pendiente</option>
                            <option>Autorizado</option>
                            <option>No Autorizado</option>
                        </select>

                    </div>
                    <div class="col">

                        <label for="rol">Rol</label>
                        <select class="form-control">
                            <option>Administrador</option>
                            <option>Vendedor</option>
                        </select>
                    </div>

                </div>
            </form>
            <div class="contecentrado">
                <button class='buttonblue'>Guardar</button>
            </div>
        </div>
    );
}


export default FormularioUsuario;