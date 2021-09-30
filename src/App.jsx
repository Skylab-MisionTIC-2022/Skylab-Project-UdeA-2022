import 'css/styles.css';
import Index from './pages/Index';
import Home from 'pages/Home'
import User from 'pages/User'
import Products from 'pages/Products';
import Sales from 'pages/Sales';
import Usuarios from 'pages/Usuarios';
import PrivateLayout from 'layouts/PrivateLayout';
import FormularioUsuario from 'pages/FormularioUsuario';
import FormularioUsuarioEditar from 'pages/FormularioUsuarioEditar';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/usuarios/editar" exact>
          <FormularioUsuarioEditar />
        </Route>
        <Route path="/usuarios/crear" exact>
          <FormularioUsuario />
        </Route>
        <Route path="/usuarios" exact>
          <Usuarios />
        </Route>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  );  
}

export default App;
