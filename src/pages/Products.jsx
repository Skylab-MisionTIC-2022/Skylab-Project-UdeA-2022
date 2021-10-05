import React, { useState, useEffect} from 'react';
import { Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';


const products = [
    { codigo: "A3020", descripcion: "Licra deportiva", valorunit: "$90.000",  estado: "Disponible" },
    { codigo: "B4560", descripcion: "body deportivo", valorunit: "$50.000",  estado: "Disponible" }

]

const Products = () => {
    const [mostrarTabla, setTabla] = useState(false);
    const [productsInfo, setProductsInfo] = useState([]);
   

    useEffect(() => {
        setProductsInfo(products);
        setTabla(false);
    }, []);

    return (
        <div className=" p-8  flex-col  ml-64">
            <h4 class='textblue'> ADMINISTRACION DE PRODUCTOS</h4>
            <button class='buttonblue aligrigth' onClick={() => { setTabla(true) }}> Crear producto</button>
            <TablaProducts listaProducts={productsInfo} />
            
            {mostrarTabla ? <Redirect to="/products/crear" /> : <p></p>}
            
            
        </div>
    );
}


const TablaProducts = ({ listaProducts }) => {
    const [mostrarTabla, setTabla] = useState(false);
    const [products, setProduct] = useState();
    let history = useHistory();

    useEffect(() => {
        if(mostrarTabla){
            
        history.push({
            pathname: '/products/editar',
           
            state: { detail: products }
    
        });
    }
    }, [mostrarTabla]);
   
    return (
        <div>
            <h5 class='textblue my-2 p-3'> Productos</h5>
            <div className='space-x-1'>   
                <input type="text" placeholder='ID Producto' className='w-24 border border-blue-500 rounded' />
                <input type="text" placeholder='Descripción' className='w-35 border border-blue-500 rounded' />
                <button className='bg-transparent text-blue-700 border border-blue-500 rounded p-1 mb-3 aligrigth'>Filtrar</button>
            </div>
            <table class='table table-bordered'>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Descripcion</th>
                        <th>Valor Unitario </th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProducts.map((product) => {
                        return (
                            <tr>
                                <th>{product.codigo}</th>
                                <th>{product.descripcion}</th>
                                <th>{product.valorunit}</th>
                                <th>{product.estado}</th>
                                <th><button onClick={() => { 
                                     const arr =[product.codigo,product.descripcion,product.valorunit,product.estado]
                                     setTabla(!mostrarTabla); 
                                     setProduct(arr) }} class='buttonblue'>Editar</button>
            
                                <button class='buttonred'>Eliminar</button></th>
                            </tr>


                        );
                    }

                    )}

                </tbody>
            </table>
        </div>
    );
}



export default Products


