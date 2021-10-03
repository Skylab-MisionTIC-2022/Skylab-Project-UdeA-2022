import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
//import { Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import { useHistory } from "react-router-dom";


const listaVentas = [
    { vendedor : "Paola Avella", documento : "1013246567", cliente : "Sebastian Ramirez", documentoCliente : "1014639405",
    fecha : "1-10-2021", idVenta: "1", valorTotal: "50.000", codigoProducto: "B4560", cantidadProducto: "1",
    precioProducto : "50.000", estado: "Entregada" },
    { vendedor : "Juan Avella", documento : "1015246778", cliente : "Julieta Florez", documentoCliente : "1019648315", fecha : "5-09-2021",
        idVenta: "2", valorTotal: "90.000", codigoProducto: "3020", cantidadProducto: "1", precioProducto : "90.000", 
        estado: "Cancelada" }
]

const Sales = () => {

    //const [mostrarTabla, setMostratTabla] = useState(false);
    const [ventasInfo, setVentasInfo] = useState([]);

    useEffect (() => {
        //setMostratTabla(false);
        setVentasInfo(listaVentas);
    }, []);

    return (  
        <div className=" p-8  flex-col  ml-64 ">
            <h4 className='textblue my-2 p-3'> ADMINISTRACIÓN DE VENTAS</h4>
            <Link to='/CrearVenta'>
                <button className='buttonblue aligrigth' >Crear Venta</button>    
            </Link>
            <TablaVentas dataVentas={listaVentas}/>
            
        </div>

    );
}

const TablaVentas = ({ dataVentas }) =>{
    
    return (
        <div>
            <h5 className='textblue my-2 p-3'>Ventas Actuales</h5>
            <div className='space-x-1'>   
                <input type="text" placeholder='ID Venta' className='w-20 border border-blue-500 rounded' />
                <input type="text" placeholder='Documento' className='w-24 border border-blue-500 rounded' />
                <input type="text" placeholder='Nombre' className='w-24 border border-blue-500 rounded' />
                <button className='bg-transparent text-blue-700 border border-blue-500 rounded p-1 mb-3 aligrigth'>Filtrar</button>
            </div>
           
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Fecha</th>
                        <th>Documento</th>
                        <th>Cliente</th>
                        <th>Vendendor</th>
                        <th>Valor Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dataVentas.map((venta) => {
                        return (
                            <tr>
                                <td>{venta.idVenta}</td>
                                <td>{venta.fecha}</td>
                                <td>{venta.documento}</td>
                                <td>{venta.cliente}</td>
                                <td>{venta.vendedor}</td>
                                <td>{venta.valorTotal}</td>
                                <td>{venta.estado}</td>
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
 
export default Sales;