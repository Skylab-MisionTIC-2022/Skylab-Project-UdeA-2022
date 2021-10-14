import axios from 'axios';

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/Productos',
  headers: {
    Authorization: getToken(),
 }
};
  await axios
    .request(options)
    .then(function (response) {
      setProductos(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/Ventas',
  headers: {
    Authorization: getToken(),
 } };
  await axios
    .request(options)
    .then(function (response) {
      setVentas(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

// CRUD DE VENTAS

export const crearVenta = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/Ventas/Nuevo',
    headers: { 'Content-Type': 'application/json', Authorization: getToken(),  },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

// GET PARA VENDEDORES

export const obtenerVendedores = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/vendedores',
  headers: {
    Authorization: getToken(),
 }
  
 };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

const getToken=()=>{
  return `Bearer ${localStorage.getItem('token')}`
}

// get PARA USUARIOS
export const obtenerUsuarios = async (setUsuarios, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/usuarios',
  headers: {
     Authorization: getToken(),
  } };
  await axios
    .request(options)
    .then(function (response) {
      setUsuarios(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};




