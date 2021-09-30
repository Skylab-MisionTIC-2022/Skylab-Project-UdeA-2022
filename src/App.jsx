import 'css/styles.css';
<<<<<<< HEAD
import Index from './pages/Index.jsx';
import Usuarios from './pages/Usuarios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FormularioUsuarioEditar from './pages/FormularioUsuarioEditar';
import FormularioUsuario from './pages/FormularioUsuario';


function App() {
  return (

    <div>

<Router>
        <Switch>

          
          <Route path="/usuarios/editar" exact>
            <FormularioUsuarioEditar />
          </Route> 
          <Route path="/usuarios/crear" exact>
            <FormularioUsuario/>
          </Route>  
          <Route path="/usuarios" exact>
            <Usuarios />
          </Route>
         

          <Route path="/">
            <Index />
          </Route>


        </Switch>
      </Router>
    </div>
=======
import Index from './pages/Index';
import Home from 'pages/Home'
import User from 'pages/User'
import Products from 'pages/Products';
import Sales from 'pages/Sales';
import PrivateLayout from 'layouts/PrivateLayout';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/home">
          <PrivateLayout>
            <Home />
          </PrivateLayout>
          </Route>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
>>>>>>> 2.home-layout
  );  
}

export default App;
