import axios from 'axios';

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/Productos/' };
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


