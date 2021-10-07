import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const listaProductos = [

    { codigo: "A3020", descripcion: "Licra deportiva", cantidad : "2", precio: "$90.000",  total :"180.000" },
    { codigo: "B4560", descripcion: "body deportivo", cantidad : "2", precio: "$50.000",  total: "100.000" },
    { codigo : "C5642", descripcion : "jogger", cantidad : "2", precio : "35000", total : "70000"},
    ];

const listaVentas = [
    { vendedor : "Paola Avella", documento : "1013246567", cliente : "Sebastian Ramirez", documentoCliente : "1014639405",
    fecha : "1-10-2021", idVenta: "1", valorTotal: "50.000", codigoProducto: "B4560", cantidadProducto: "1",
    precioProducto : "50.000", estado: "Entregada" },
    { vendedor : "Juan Avella", documento : "1015246778", cliente : "Julieta Florez", documentoCliente : "1019648315", fecha : "5-09-2021",
        idVenta: "2", valorTotal: "90.000", codigoProducto: "3020", cantidadProducto: "1", precioProducto : "90.000", 
        estado: "Cancelada" }
]

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
                    <div class="col">
                        <label for="idVenta">ID Venta</label>
                        <input type="number" disabled className="form-control" required placeholder='1' />
                    </div>
                    <div className='col'>
                        <label for="vendedor">Vendedor</label>
                        <select name="vendedor" id='vendedor' className="form-control" placeholder='Paola' >
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
                        <input type="text" className="form-control" placeholder='Sebastian Ramirez' />
                    </div>
                    <div class="col">
                        <label for="documentoCliente" id="DocumentoClienteVenta">N° Documento del Cliente</label>
                        <input type="number" className="form-control" placeholder='1013246567'/>
                    </div>
                </div>
                <div className='row'>
                    <div class="col">
                        <label for="fecha" id="fechaVenta">Fecha</label>
                        <input type="date" className="form-control" placeholder='1/10/2021'/>
                    </div>
                    <div class="col">
                        <label for="estado">Estado</label>
                        <select name="estado" id='estado' className="form-control" value=''>
                            <option value="Seleccione">Seleccione</option>
                            <option value="en proceso">En proceso</option>
                            <option value="cancelada">Cancelada</option>
                            <option value="cancelada">Entregada</option>
                        </select>
                    </div>
                </div>
            </form>

            <h4 className='my-2 p-2'>Productos</h4>
            <ElegirItems dataItems={listaProductos}/>

            <form>
                <div className='row'>
                    <div class="col">
                        <label for="valor Total" >Valor Total</label>
                        <input type="number" className="form-control" placeholder='$50.000' />
                    </div>
                </div>
            </form>
            <div class="contecentrado">
                <Link to='/Sales'>
                    <button class='buttonblue'>Guardar</button>
                </Link>
                
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
                        <input type='checkbox' className='my-3' disabled/>
                        <th>Código</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dataItems.map((producto) => {
                        return (
                            <tr>
                                <input type="checkbox" className='my-3' disabled/>
                                <td>{producto.codigo}</td>
                                <td>{producto.descripcion}</td>
                                <input type="number" name='cantidad' className='w-24' min='0'/>
                                <td>{producto.precio}</td>
                                <input type="number" name='subtotal' className='w-24'/>
                                <td>
                                    <Link to='/FormularioProductoEditar'>
                                        <button className='buttonred' >Eliminar</button>
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

export default EditarVenta
