import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
//import { Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import { useHistory } from "react-router-dom";


const listaVentas = [
    { vendedor : "Paola Avella", cliente : "Sebastian Ramirez", documentoCliente : "1014639405",
    fecha : "1-10-2021", idVenta: "1", valorTotal: "50.000", codigoProducto: "B4560", cantidadProducto: "1",
    precioProducto : "50.000", estado: "Entregada" },
    { vendedor : "Juan Avella", cliente : "Julieta Florez", documentoCliente : "1019648315", fecha : "5-09-2021",
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
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Fecha</th>
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