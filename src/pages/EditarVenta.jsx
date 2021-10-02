import React from 'react'
import { Link } from 'react-router-dom'

const EditarVenta = () => {

    return (
        <div className=" p-8  flex-col  ml-64 ">
            <h4 className='textblue'> ADMINISTRACION DE VENTAS</h4>
            <Link to='/Sales'>
                <button className='buttonblue aligrigth'>Ver Ventas</button>
            </Link>
            <h5 className='textblue'>Edita tu Venta</h5>
            <form>
                <div className='row'>
                    <div className='col'>
                        <label for="vendedor">Vendedor</label>
                        <select name="vendedor" id='vendedor' className="form-control">
                                <option value="Seleccione">Seleccione</option>
                                <option value="Maria">Maria</option>
                                <option value="Paola">Paola</option>
                                <option value="Juan">Juan</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div class="col">
                        <label for="cliente">Nombre Cliente</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div class="col">
                        <label for="documentoCliente">N° Documento del Cliente</label>
                        <input type="number" className="form-control" />
                    </div>
                </div>
                <div className='row'>
                    <div class="col">
                        <label for="fecha">Fecha</label>
                        <input type="date" className="form-control" />
                    </div>
                    <div class="col">
                        <label for="estado">Estado</label>
                        <select name="estado" id='estado' className="form-control">
                            <option value="Seleccione">Seleccione</option>
                            <option value="en proceso">En proceso</option>
                            <option value="cancelada">Cancelada</option>
                            <option value="cancelada">Entregada</option>
                        </select>
                    </div>
                </div>
            </form>

            <div>tabla</div>

            <form>
                <div className='row'>
                    <div class="col">
                        <label for="valor Total">Valor Total</label>
                        <input type="number" className="form-control" />
                    </div>
                </div>
            </form>
            <div class="contecentrado">
                <button class='buttonblue'>Guardar</button>
            </div>
        </div>
    )
}

export default EditarVenta
