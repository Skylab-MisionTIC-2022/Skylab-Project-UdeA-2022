import axios from 'axios';

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
<<<<<<< HEAD
  const options = { method: 'GET', url: 'http://localhost:5000/Productos' };
=======
  const options = { method: 'GET', url: 'http://localhost:5000/Productos/' };
>>>>>>> 1e407a1a9b5fa829eaf0c68b189c918922107375
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

export const obtenerUsuarios = async (setProductos, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/usuarios' };
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




