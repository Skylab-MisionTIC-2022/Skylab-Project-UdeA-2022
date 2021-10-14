import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerVentas } from 'utils/api';


import 'react-toastify/dist/ReactToastify.css';

const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nueva Venta');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerVentas(setVentas, setEjecutarConsulta);

    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de ventas desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nueva Venta');
      
    } else {
      setTextoBoton('Mostrar Todas los ventas');
      
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8 ml-64 '>
      <div className='flex flex-col w-full'>

        <h2 className='text-3xl font-extrabold text-gray-900'>
             Administración de ventas
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
        <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionVentas
          setMostrarTabla={setMostrarTabla}
          listaVentas={ventas}
          setVentas={setVentas}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaVentas = ({ listaVentas, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [ventasFiltrados, setVentasFiltrados] = useState(listaVentas);

  useEffect(() => {
    setVentasFiltrados(
      listaVentas.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaVentas]);

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
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>Documento</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Valor Total</th>
            <th>Estado</th>
            <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiltrados.map((venta) => {
              return (
                <FilaVenta
                  key={nanoid()}
                  venta={venta}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {ventasFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.idVenta}</span>
              <span>{el.fecha}</span>
              <span>{el.documento}</span>
              <span>{el.cliente}</span>
              <span>{el.vendedor}</span>
              <span>{el.valorTotal}</span>
              <span>{el.estado}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaVenta = ({ venta, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevaVenta, setInfoNuevaVenta] = useState({
    idVenta: venta.idVenta,
    fecha: venta.fecha,
    documento: venta.documento,
    cliente: venta.cliente,
    vendedor: venta.vendedor,
    valorTotal: venta.valorTotal,
    estado: venta.estado
  
  });

  const actualizarVenta = async () => {
    //enviar la info al backend
    const options = {
      method: 'PATCH',
      url: `http://localhost:5000/Ventas/${venta._id}/`,
      headers: { 'Content-Type': 'application/json' },
      data: { ...infoNuevaVenta, id: venta._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Venta modificada con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error('Error modificando la venta');
        console.error(error);
      });
  };  

  const eliminarVenta = async () => {
    const options = {
      method: 'DELETE',
      url: `http://localhost:5000/Ventas/${venta._id}/`,
      headers: { 'Content-Type': 'application/json' },
      data: { id: venta._id },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('venta eliminada con éxito');
        setEjecutarConsulta(true);  
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error eliminando la venta');
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
              value={infoNuevaVenta.idVenta}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta,   idVenta: e.target.value })}
            />
          </td>
          <td>
          <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.fecha}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta,   fecha: e.target.value })}
            />
          </td>
          <td>
          <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.documento}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta,   documento: e.target.value })}
            />
          </td>
          <td>
          <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.cliente}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta,   cliente: e.target.value })}
            />
          </td>
          <td>       
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.vendedor}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, vendedor: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.valorTotal}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, valorTotal: e.target.value })
              }
            />
          </td>
          <td>
          <select
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.estado}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, estado: e.target.value })
              }
              defaultValue={0}
              >
              <option disabled value={0}>
                Seleccione una opción
              </option>
              <option>Proceso</option>
              <option>Cancelada</option>
              <option>Entregada</option>
  
              </select>
            </td>
          </>
      ) : (
        <>
          <td >{venta.idVenta}</td>
          <td >{venta.fecha}</td>
          <td>{venta.documento}</td>
          <td>{venta.cliente}</td>
          <td>{venta.vendedor}</td>
          <td>{venta.valorTotal}</td>
          <td>{venta.estado}</td>
       
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarVenta()}
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
              <Tooltip title='Editar Venta' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar Venta' arrow>
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
              ¿Está seguro de querer eliminar la venta?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => eliminarVenta()}
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

const FormularioCreacionVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    const options = {
      method: 'POST',
      url: 'http://localhost:5000/Ventas/Nuevo/',
      headers: { 'Content-Type': 'application/json' },
      data: {   idVenta: nuevaVenta.idVenta, nuevaVenta: nuevaVenta.fecha, 
        documento: nuevaVenta.documento, cliente: nuevaVenta.cliente, vendedor: nuevaVenta.vendedor,valorTotal: nuevaVenta.valorTotal,estado:nuevaVenta.estado },
    
    };
  
   
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Venta agregado con éxito');
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error creando una venta');
      });

    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nueva venta</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='idVenta'>
          Codigo del venta
          <input
            name='idVenta'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='consecutivo venta'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='fecha'>
          Fecha de venta
          <input
          name='fecha'
          className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='fecha hoy'
            required
            />
           </label>
           <label className='flex flex-col' htmlFor='documento'>
          Documento cliente
          <input
          name='documento'
          className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='1234'
            required
            />
           </label>
           <label className='flex flex-col' htmlFor='cliente'>
          Nombre cliente
          <input
          name='cliente'
          className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Pedro Perez'
            required
            />
           </label>
           <label className='flex flex-col' htmlFor='vendedor'>
          Vendedor
          <input
          name='vendedor'
          className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Luis Perez'
            required
            />
           </label>
           <label className='flex flex-col' htmlFor='valorTotal'>
            Valor Venta
          <input
          name='valorTotal'
          className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='70.000'
            required
            />
           </label>
        <label className='flex flex-col' htmlFor='estado'>
          Estado de la venta
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='estado'
            required
            defaultValue={0}
          >
            
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Proceso</option>
            <option>Cancelada</option>
            <option>Entregada</option>

          </select>
        </label>
          
 
        <label>


        </label>
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white buttonblue'
        >
          Guardar venta
        </button>
      </form>
    </div>
  );
};

export  default Ventas
