import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const listaProductos = [

{ codigo: "A3020", descripcion: "Licra deportiva", cantidad : "2", precio: "$90.000",  total :"180.000" },
{ codigo: "B4560", descripcion: "body deportivo", cantidad : "2", precio: "$50.000",  total: "100.000" },
{ codigo : "sdg", descripcion : "jogger", cantidad : "2", precio : "35000", total : "70000"},
];



const CrearVenta = () => {


    const GuardarInfoVentas = () =>{
        toast.success("Venta guardada con éxito");
    }

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
                        <select name="vendedor" id='vendedor' className="form-control"
                        required>
                                <option value="Seleccione" disabled>Seleccione</option>
                                <option value="Maria">Maria</option>
                                <option value="Paola">Paola</option>
                                <option value="Juan">Juan</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div class="col">
                        <label for="cliente">Nombre Cliente</label>
                        <input type="text" placeholder='Angela Zuluaga' 
                        className="form-control" required
                        />
                    </div>
                    <div class="col">
                        <label for="documentoCliente">N° Documento del Cliente</label>
                        <input type="number" placeholder='1018523687' 
                        className="form-control" required />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label for="fecha">Fecha</label>
                        <input type="date" className="form-control" required/>
                    </div>
                    <div className="col">
                        <label for="estado">Estado</label>
                        <select name="estado" id='estado' className="form-control" required>
                            <option value="Seleccione" disabled>Seleccione</option>
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
                    <div className="col">
                        <label for="valor Total">Valor Total</label>
                        <input type="number" className="form-control" required/>
                    </div>
                </div>
            </form>
            <div className="contecentrado">
                <button type='submit' className='buttonblue' onClick={GuardarInfoVentas}
                >Guardar</button>
                <ToastContainer
                position="top-center"
                autoClose={3000} />
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
                    </tr>
                </thead>
                <tbody>
                    {dataItems.map((producto) => {
                        return (
                            <tr>
                                <input type="checkbox" className='my-3'/>
                                <td>{producto.codigo}</td>
                                <td>{producto.descripcion}</td>
                                <input type="number" name='cantidad' className='w-24' min='0'/>
                                <td>{producto.precio}</td>
                                <input type="number" className='w-24'/>
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

export default CrearVenta

