import axios from 'axios';

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'https://vast-waters-45728.herokuapp.com/vehicle/' };
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


