import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useLocation } from "react-router-dom";


const FormularioProductoEditar = props => {
    const [mostrarTabla, setTabla] = useState(false);
    const location = useLocation();



    useEffect(() => {
        setTabla(false);
    }, []);

    return (
        <div className=" p-8  flex-col  ml-64">
            <h4 class='textblue'> ADMINISTRACION DE PRODUCTOS</h4>
            <button class='buttonblue aligrigth' onClick={() => { setTabla(true) }}> Ver productos</button>
            {mostrarTabla ? <Redirect to="/products" /> : <p></p>}
            <h5 class='textblue'> Editar producto</h5>
            <form>
                <div class="row">
                    <div class="col">
                        <label for="codigo"> Codigo </label>
                        <div>
                            <input type="text" readonly class="form-control"  value={location.state.detail[0]}/>
                        </div>
                        
                    </div>
                    <div class="col">
                        <label for="descripcion">Descripcion</label>
                        <div>
                            <input type="text" readonly class="form-control"  value={location.state.detail[1]}/>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col">
                        <label for="valor">Valor Unitario</label>
                        <div>
                            <input type="text" readonly class="form-control"  value={location.state.detail[2]}/>
                        </div>
                    </div>

                    <div class="col">

                        <label for="estado">Estado</label>
                        <select class="form-control">
                            <option>Disponible</option>
                            <option>No disponible</option>
      
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

export default FormularioProductoEditar
