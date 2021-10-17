import Index from './pages/Index';
import Home from 'pages/Home'
import Products from 'pages/Products';
import Sales from 'pages/Sales';
import Usuarios from 'pages/Usuarios';
import PrivateLayout from 'layouts/PrivateLayout';
import 'bootstrap/dist/css/bootstrap.css';
import 'css/styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Auth0Provider } from "@auth0/auth0-react";
import React, { useState, useEffect } from 'react';

import { DarkModeContext } from 'context/darkMode';
import { UserContext } from 'context/userContext';
import PrivateRoute from 'components/PrivateRoute';

function App() {  
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log('modo dark:', darkMode);
  }, [darkMode]);

  return (
    <Auth0Provider 
    domain="skylabtic.us.auth0.com"
    clientId="oKQDl3OEiRo10vHyzmgrGtVapysBsPGB"
    redirectUri="http://localhost:3000/Home"
    audience= 'api-autenticacion'>
        
      <div className='App'>
        <UserContext.Provider value={{ userData, setUserData }}>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
           <Router>
            <Switch>
              <Route path={['/Home', '/usuarios', '/products', '/Sales']}>
                <PrivateLayout>
                  <Switch>
                    <Route path="/Home" exact>
                      <PrivateRoute roleList={['Administrador', 'Vendedor']}>
                       <Home />
                       </PrivateRoute>
                    </Route>
                    <Route path="/usuarios" exact>
                      <PrivateRoute roleList={['Administrador']}>
                        <Usuarios />
                       </PrivateRoute>
                    </Route>
                    <Route path="/products" exact>
                      <PrivateRoute roleList={['Administrador']}>
                          <Products />
                      </PrivateRoute>
                    </Route>
                    <Route path="/Sales" exact>
                      <PrivateRoute roleList={['aAdministrador', 'Vendedor']}>
                          <Sales />
                      </PrivateRoute>
                    </Route>
                  </Switch>
                </PrivateLayout>
              </Route>
              <Index />
            </Switch>
          </Router>
      
      </DarkModeContext.Provider>
        </UserContext.Provider>
      </div>
    </Auth0Provider>
  );
}

export default App;


