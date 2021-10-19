import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerVentas, crearVenta, obtenerProductosV, obtenerUsuariosV, getToken } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';

const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nueva Venta');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

 // useEffect(() => {
  //  const fetchVtas = async () => {
       // await obtenerVentas(
       //   (response) => {
       //     console.log('respuesta de ventas', response);
       //     setVentas(response.data);
       //     },
       //   (error) => {
       //     console.error(error);
       //  //   }
       // );
     // };
     //  fetchVtas();
     //  setEjecutarConsulta(false);
  //  }, []);


  

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
              <span>{el.vendedor.name}</span>
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
    vendedor: venta.name,
    valorTotal: venta.valorTotal,
    estado: venta.estado
  
  });
  const actualizarVenta = async () => {
    //enviar la info al backend
    const options = {
      method: 'PATCH',
      url: `http://localhost:5000/Ventas/${venta._id}/`,
      headers: { 'Content-Type': 'application/json', Authorization: getToken(),  },
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
      headers: { 'Content-Type': 'application/json', Authorization: getToken(),  },
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
              type='date'
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
          <td>{venta.vendedor.name} </td>
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
  const [vendedores, setVendedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosTabla, setProductosTabla] = useState([]);

  useEffect(() => {
    const fetchVendores = async () => {
      await obtenerUsuariosV(
        (response) => {
          console.log('respuesta de usuarios', response);
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchProductos = async () => {
      await obtenerProductosV(
        (response) => {
          setProductos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    fetchVendores();
    fetchProductos();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log('form data', formData);

    const listaProductos = Object.keys(formData)
      .map((k) => {
        if (k.includes('producto')) {
          return productosTabla.filter((v) => v.codigo === formData[k])[0];
        }
        return null;
      })
      .filter((v) => v);

    console.log('lista antes de cantidad', listaProductos);

   
    const datosVenta = {
      vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
      idVenta: formData.idVenta,
      fecha: formData.fecha,
      documento: formData.documento,
      cliente: formData.cliente,
      estado: formData.estado,
      valorTotal: formData.valor,
      productos: listaProductos,
    };

    await crearVenta(
      datosVenta,
      (response) => {
        console.log(response);
        toast.success('Venta agregada con éxito');
      },
      (error) => {
        console.error(error);
        toast.error('Error creando una venta');
      }
    );
    setMostrarTabla(true);
  };

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <form ref={form} onSubmit={submitForm} className="flex flex-col h-full">
        <h1 className="text-3xl font-extrabold text-gray-900 my-3">
          Crear una nueva venta
        </h1>
        <div className="flex flex-row mr-36">
          <label className="flex flex-col" htmlFor="vendedor">
            <span className="text-2xl font-gray-900">Vendedor</span>
            <select name="vendedor" className="p-2" defaultValue="" required>
              <option disabled value="">
                Seleccione un Vendedor
              </option>
              {vendedores.map((el) => {
                return (
                  <option
                    key={nanoid()}
                    value={el._id}
                  >{`${el.family_name} ${el.given_name}`}</option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col" htmlFor="idVenta">
            ID venta
            <input
              name="idVenta"
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              placeholder="consecutivo venta"
              required
            />
          </label>

          <label className="flex flex-col" htmlFor="fecha">
            Fecha de venta
            <input
              name="fecha"
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="date"
              placeholder="fecha hoy"
              required
            />
          </label>
        </div>
        <div className="flex flex-row">
          <label className="flex flex-col" htmlFor="documento">
            Documento cliente
            <input
              name="documento"
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              placeholder="1234"
              required
            />
          </label>
          <label className="flex flex-col" htmlFor="cliente">
            Nombre cliente
            <input
              name="cliente"
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              type="text"
              placeholder="Pedro Perez"
              required
            />
          </label>

          <label className="flex flex-col" htmlFor="estado">
            Estado de la venta
            <select
              className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
              name="estado"
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
        </div>

        <TablaProductos
          productos={productos}
          setProductos={setProductos}
          setProductosTabla={setProductosTabla}
        />

        <label className="flex flex-col">
          <span className="text-2xl font-gray-900">Valor Total Venta</span>
          <input
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            name="valor"
            required
          />
        </label>
        <button
          type="submit"
          className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
        >
          Crear Venta
        </button>
      </form>
    </div>
  );
};

const TablaProductos = ({ productos, setProductos, setProductosTabla }) => {
  const [productoAAgregar, setProductoAAgregar] = useState({});
  const [filasTabla, setFilasTabla] = useState([]);

  useEffect(() => {
    setProductosTabla(filasTabla);
  }, [filasTabla, setProductosTabla]);

  const agregarNuevoProducto = () => {
    setFilasTabla([...filasTabla, productoAAgregar]);
    setProductos(productos.filter((v) => v._id !== productoAAgregar._id));
    setProductoAAgregar({});
  };

  const eliminarProducto = (productoAEliminar) => {
    setFilasTabla(filasTabla.filter((v) => v._id !== productoAEliminar._id));
    setProductos([...productos, productoAEliminar]);
  };
  const modificarProducto = (producto, cantidad, totalventa) => {
    setFilasTabla(
      filasTabla.map((ft) => {
        if (ft.codigo === producto.codigo) {
          ft.cantidad = cantidad;
          ft.total = producto.valorunit * cantidad;
        }
        
        return ft;
      })
    );
   
  };

  return (
    <div>
      <div className='flex '>
        <label className='flex flex-col' htmlFor='producto'>
          <select
            className='p-2'
            value={productoAAgregar.codigo ?? ''}
            onChange={(e) =>
              setProductoAAgregar(productos.filter((v) => v.codigo === e.target.value)[0])
            }
          >
            <option disabled value=''>
              Seleccione un Producto
            </option>
            {productos.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el.codigo}
                  >{`${el.descripcion} ${el.valorunit}  `}</option>
              );
            })}
          </select>
        </label>
        <button
          type='button'
          onClick={() => agregarNuevoProducto()}
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Agregar Producto
        </button>
      </div>
      <table className='tabla'>
        <thead>
          <tr>
          <th>IDProducto</th>
            <th>descripcion</th>
            <th>precio</th>
            <th>Cantidad</th>
            <th>valorTotal</th>
            <th>Eliminar</th>
            <th className='hidden'>Input</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((el, index) => {
            return (
              <FilaProducto
              key={el._codigo}
              prod={el}
              index={index}
              eliminarProducto={eliminarProducto}
              modificarProducto={modificarProducto}
            />

            );
          })}
        </tbody>
      </table>
    </div>
  );
};
const FilaProducto = ({ prod, index, eliminarProducto, modificarProducto }) => {
  const [producto, setProducto] = useState(prod);
  useEffect(() => {
    console.log('prod', producto);
  }, [producto]);
  return (
    <tr>
      <td >{producto.codigo}</td>
      <td>{producto.descripcion}</td>
      <td>{producto.valorunit}</td>

      <td>
        <label htmlFor={`valor_${index}`}>
          <input
            type='number'
            name={`cantidad_${index}`}
            value={producto.cantidad}
            onChange={(e) => {
              modificarProducto(producto, e.target.value === '' ? '0' : e.target.value);
              setProducto({
                ...producto,
                cantidad: e.target.value === '' ? '0' : e.target.value,
                total:
                  parseFloat(producto.valorunit) *
                  parseFloat(e.target.value === '' ? '0' : e.target.value),
              });
            }}
          />
        </label>
      </td>
      <td>{parseFloat(producto.total ?? 0)}</td>
      <td>
        <i
          onClick={() => eliminarProducto(producto)}
          className='fas fa-minus text-red-500 cursor-pointer'
        />
      </td>
      <td className='hidden'>
        <input hidden defaultValue={producto.codigo} name={`producto_${index}`} />
      </td>
    </tr>
  );
};

export  default Ventas

