import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerProductos, getToken } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';


if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();

    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;

    var kValue;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i]; // in case t is changed in callback
          if (func(t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i];
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}
// const baseURL = "http://localhost:5000"
const baseURL = 'https://glacial-reaches-09776.herokuapp.com';

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  
  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerProductos(setProductos, setEjecutarConsulta);

    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de productos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Producto');
      
    } else {
      setTextoBoton('Mostrar Todos los productos');
      
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8 ml-64 '>
      <div className='flex flex-col w-full'>

        <h2 className='text-3xl font-extrabold text-gray-900'>
             Administración de productos
        </h2>

        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white p-2 rounded-full m-8  self-end buttonblue`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaProductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionProductos
          setMostrarTabla={setMostrarTabla}
          listaProductos={productos}
          setProductos={setProductos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

  useEffect(() => {
    setProductosFiltrados(
      listaProductos.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProductos]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
      />
      
      <div className='hidden md:flex w-full'>
        <table className='tabla'>
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
            {productosFiltrados.map((producto) => {
              return (
                <FilaProducto
                  key={nanoid()}
                  producto={producto}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {productosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.codigo}</span>
              <span>{el.descripcion}</span>
              <span>{el.valorunit}</span>
              <span>{el.estado}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaProducto = ({ producto, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    codigo: producto.codigo,
    descripcion: producto.descripcion,
    valorunit: producto.valorunit,
    estado: producto.estado,
  
  });

  const actualizarProducto = async () => {
    //enviar la info al backend
    const options = {
      method: 'PATCH',
      url: `${baseURL}/Productos/${producto._id}/`,
      headers: { 'Content-Type': 'application/json', Authorization: getToken(),  },
      data: { ...infoNuevoProducto, id: producto._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Producto modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error('Error modificando el producto');
        console.error(error);
      });
  };  

  const eliminarProducto = async () => {
    const options = {
      method: 'DELETE',
      url: `${baseURL}/Productos/${producto._id}/`,
      headers: { 'Content-Type': 'application/json', Authorization: getToken(),  },
      data: { id: producto._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('producto eliminado con éxito');
        setEjecutarConsulta(true);  
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error eliminando el producto');
      });
    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.codigo}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, codigo: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.descripcion}
              onChange={(e) =>
                setInfoNuevoProducto({ ...infoNuevoProducto, descripcion: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              value={infoNuevoProducto.valorunit}
              onChange={(e) =>
                setInfoNuevoProducto({ ...infoNuevoProducto, valorunit: e.target.value })
              }
            />
          </td>
          <td>
          <select
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.estado}
              onChange={(e) =>
                setInfoNuevoProducto({ ...infoNuevoProducto, estado: e.target.value })
              }
              defaultValue={0}
              >
              <option disabled value={0}>
                Seleccione una opción
              </option>
              <option>Disponible</option>
              <option>No disponible</option>
  
              </select>
            </td>
          </>
      ) : (
        <>
          <td >{producto.codigo}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.valorunit}</td>
          <td>{producto.estado}</td>
       
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarProducto()}
                  className='fas fa-check text-green-700 hover:text-green-500'
                />
              </Tooltip>
              <Tooltip title='Cancelar edición' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Editar Producto' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar Producto' arrow>
                <i
                  onClick={() => setOpenDialog(true)}
                  className='fas fa-trash text-red-700 hover:text-red-500'
                />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className='p-8 flex flex-col'>
            <h1 className='text-gray-900 text-2xl font-bold'>
              ¿Está seguro de querer eliminar el producto?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => eliminarProducto()}
                className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
              >
                Sí
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    const options = {
      method: 'POST',
      url: `${baseURL}/Productos/Nuevo/`,
      headers: { 'Content-Type': 'application/json', Authorization: getToken(),  },
      data: { codigo: nuevoProducto.codigo, descripcion: nuevoProducto.descripcion, valorunit: nuevoProducto.valorunit, estado:nuevoProducto.estado },
    
    };
  
   
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Producto agregado con éxito');
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error creando un producto');
      });

    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo producto</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='codigo'>
          Codigo del producto
          <input
            name='codigo'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='AB006'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='descripcion'>
          Descripción del producto
          <input
          name='descripcion'
          className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='blusa deportiva'
            required
            />
           </label>
           <label className='flex flex-col' htmlFor='valorunit'>
            Valor Unitario
          <input
          name='valorunit'
          className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='70000'
            required
            />
           </label>
        <label className='flex flex-col' htmlFor='estado'>
          Estado del producto
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='estado'
            required
            defaultValue={0}
          >
            
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Disponible</option>
            <option>No disponible</option>

          </select>
        </label>
          
 
        <label>


        </label>
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white buttonblue'
        >
          Guardar producto
        </button>
      </form>
    </div>
  );
};

export  default Productos


