import 'css/styles.css';
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
  );  
}

export default App;
