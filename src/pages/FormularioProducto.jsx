import React, { useState, useEffect} from 'react';
import { Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
const FormularioProducto = () => {

    const [mostrarTabla, setTabla] = useState(false);
  
    

    useEffect(() => {
        setTabla(false);
    }, []);

    return (
        <div className=" p-8  flex-col  ml-64">
            <h4 class='textblue'> ADMINISTRACION DE PRODUCTOS</h4>
            <button class='buttonblue aligrigth' onClick={() => { setTabla(true) }}> Ver productos</button>
            {mostrarTabla ? <Redirect to="/products" /> : <p></p>}
            <h5 class='textblue'> Crear producto</h5>
            <form>
                <div class="row">
                    <div class="col">
                        <label for="name">Codigo</label>
                        <input type="text" class="form-control" />
                    </div>
                    <div class="col">
                        <label for="name">Descripcion</label>
                        <input type="text" class="form-control" />
                    </div>

                </div>
                <div class="row">
                    <div class="col">
                        <label for="email">Valor Unitario</label>
                        <input type="text" class="form-control" />
                    </div>

                    <div class="col">

                        <label for="estado">Estado</label>
                        <select class="form-control">
                            <option>Disponible</option>
                            <option>No Disponible</option>
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


export default FormularioProducto;