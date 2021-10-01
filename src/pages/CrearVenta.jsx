import React from 'react'
import { Link } from 'react-router-dom'

const listaProductos = [

{ codigo: "A3020", descripcion: "Licra deportiva", cantidad : "2", precio: "$90.000",  total :"180.000" },
{ codigo: "B4560", descripcion: "body deportivo", cantidad : "2", precio: "$50.000",  total: "100.000" },
{ codigo : "sdg", descripcion : "jogger", cantidad : "2", precio : "35000", total : "70000"},
]

const CrearVenta = () => {
    return (
        <div className=" p-8  flex-col  ml-64 ">
            <h4 className='textblue'> ADMINISTRACION DE VENTAS</h4>
            <Link to='/Sales'>
                <button className='buttonblue aligrigth'>Ver Ventas</button>
            </Link>
            <h5 className='textblue'>Crea tu Venta</h5>
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
            <h4 className='my-2 p-2'>Eliga los productos</h4>
            <ElegirItems dataItems={listaProductos}/>

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

const ElegirItems = ({ dataItems }) =>{
    
    return (
        <div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {dataItems.map((producto) => {
                        return (
                            <tr>
                                <td>{producto.codigo}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.total}</td>
                                <td>
                                    {/* Pendiente agregar evento a boton editar */}
                                    <Link to='/EditarVenta'>
                                        <button class='buttonblue' >Editar</button>
                                    </Link>
                                    <Link to='/FormularioProductoEditar'>
                                        <button class='buttonred' >Eliminar</button>
                                    </Link>
                                </td>
                            </tr>

                                
                        )
                    })}

                </tbody>
            </table>
        </div>
    )

}

export default CrearVenta

