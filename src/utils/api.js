import axios from 'axios';

export const getToken=()=>{
  return `Bearer ${localStorage.getItem('token')}`
}

const baseURL = 'https://glacial-reaches-09776.herokuapp.com';

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
  const options = { 
    method: 'GET', 
    url: `${baseURL}/Productos/`,
    headers: {
      Authorization: getToken(), 
    }};
    
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

// export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
//   const options = { method: 'GET', url: `${baseURL}/Ventas}`,
//   headers: {
//     Authorization: getToken(),
//  } };
//   await axios
//     .request(options)
//     .then(function (response) {
//       setVentas(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
//   setEjecutarConsulta(false);
export const obtenerProductosV = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: `${baseURL}/Productos/`,
  headers: {
    Authorization: getToken(),
 } };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//export const obtenerVentas = async (successCallback, errorCallback) => {
//  const options = { method: 'GET', url: '${baseURL}/Ventas/',
//  headers: {
//    Authorization: getToken(),
// } };
 //// await axios.request(options).then(successCallback).catch(errorCallback);
//};



export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
  const options = { method: 'GET', url: `${baseURL}/Ventas/`,
  headers: {Authorization: getToken(), }};
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
//export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
 // const options = { method: 'GET', url: '${baseURL}/Ventas' };
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
    url: `${baseURL}/Ventas/Nuevo/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken(),  },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


// CRUD PARA USUARIOS

export const obtenerUsuariosV = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: `${baseURL}/Usuarios/`,
  headers: {
    Authorization: getToken(),
 } };
  await axios.request(options).then(successCallback).catch(errorCallback);
};



// get PARA USUARIOS
export const obtenerUsuarios = async (setUsuarios, setEjecutarConsulta) => {
  const options = { method: 'GET', url: `${baseURL}/usuarios/`,
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


export const obtenerDatosUsuarios = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: `${baseURL}/usuarios/self`,
  headers: {
    Authorization: getToken(),
 }, };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


