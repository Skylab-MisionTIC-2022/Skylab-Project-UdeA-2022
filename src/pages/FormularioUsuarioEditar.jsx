import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const FormularioUsuarioEditar = props => {
    const [mostrarTabla, setTabla] = useState(false);
    const location = useLocation();



    useEffect(() => {
        setTabla(false);
    }, []);

    return (
        <div className=" p-8  flex-col  ml-64">
            <h4 class='textblue'> ADMINISTRACION DE USUARIOS</h4>
            <button class='buttonblue aligrigth' onClick={() => { setTabla(true) }}> Ver usuarios</button>
            {mostrarTabla ? <Redirect to="/usuarios" /> : <p></p>}
            <h5 class='textblue'> Editar usuario</h5>
            <form>
                <div class="row">
                    <div class="col">
                        <label for="name"> Nombre </label>
                        <div>
                            <input type="text" readonly class="form-control"  value={location.state.detail[0]}/>
                        </div>
                        
                    </div>
                    <div class="col">
                        <label for="name">Primer Apellido</label>
                        <div>
                            <input type="text" readonly class="form-control"  value={location.state.detail[1]}/>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col">
                        <label for="email">Correo</label>
                        <div>
                            <input type="email" readonly class="form-control"  value={location.state.detail[2]}/>
                        </div>
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

export default FormularioUsuarioEditar
