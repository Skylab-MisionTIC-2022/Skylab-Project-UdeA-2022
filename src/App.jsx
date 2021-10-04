import Index from './pages/Index';
import Home from 'pages/Home'
import Products from 'pages/Products';
import FormularioProducto from 'pages/FormularioProducto';
import FormularioProductoEditar from 'pages/FormularioProductoEditar';
import Sales from 'pages/Sales';
import Usuarios from 'pages/Usuarios';
import PrivateLayout from 'layouts/PrivateLayout';
import FormularioUsuario from 'pages/FormularioUsuario';
import FormularioUsuarioEditar from 'pages/FormularioUsuarioEditar';
import 'bootstrap/dist/css/bootstrap.css';
import 'css/styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CrearVenta from 'pages/CrearVenta';
import EditarVenta from 'pages/EditarVenta';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Home" exact>
        <PrivateLayout>
          <Home />
        </PrivateLayout>
        </Route>
        <Route path="/usuarios/editar" exact>
        <PrivateLayout>
          <FormularioUsuarioEditar />
          </PrivateLayout>  
        </Route>
        <Route path="/usuarios/crear" exact>
        <PrivateLayout>
          <FormularioUsuario />
          </PrivateLayout>  
        </Route>
        <Route path="/usuarios" exact>
        <PrivateLayout>
          <Usuarios />
          </PrivateLayout>  
        </Route>
  
        <Route path="/products/crear" exact>
        <PrivateLayout>
        <FormularioProducto />
        </PrivateLayout>
        </Route>
        <Route path="/products/editar" exact>
        <PrivateLayout>
        <FormularioProductoEditar />
        </PrivateLayout>
        </Route>
        <Route path="/products" exact>
        <PrivateLayout>
        <Products />
        </PrivateLayout>
        </Route>
        <Route path="/Sales" exact>
        <PrivateLayout>
          <Sales />
        </PrivateLayout>  
        </Route>
        <Route path="/CrearVenta" exact>
        <PrivateLayout>
          <CrearVenta />
        </PrivateLayout>  
        </Route>
        <Route path="/EditarVenta" exact>
        <PrivateLayout>
          <EditarVenta />
        </PrivateLayout>  
        </Route>
          <Index />
       
      </Switch>
    </Router>
  );  
}

export default App;
