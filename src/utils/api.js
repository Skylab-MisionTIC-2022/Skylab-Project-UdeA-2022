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

<<<<<<< HEAD
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
=======
export const obtenerProductosV = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/Productos/' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerVentas = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/Ventas/' };
  await axios.request(options).then(successCallback).catch(errorCallback);
>>>>>>> 844f6b265e258cd0938cbae70eff8445e9eefece
};

//export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
 // const options = { method: 'GET', url: 'http://localhost:5000/Ventas' };
 // await axios
 //   .request(options)
 //   .then(function (response) {
 //     setVentas(response.data);
 //   })
  //  .catch(function (error) {
  //    console.error(error);
  //  });
 // setEjecutarConsulta(false);
//};



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


<<<<<<< HEAD
export const obtenerVendedores = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/vendedores',
  headers: {
    Authorization: getToken(),
 }
  
 };
=======
// CRUD PARA USUARIOS

export const obtenerUsuariosV = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/Usuarios' };
>>>>>>> 844f6b265e258cd0938cbae70eff8445e9eefece
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




