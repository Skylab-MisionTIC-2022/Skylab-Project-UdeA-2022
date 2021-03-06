import React, { useState } from 'react';
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
import { UserContext } from 'context/userContext';
import PrivateRoute from 'components/PrivateRoute';

function App() {
  const [userData, setUserData] = useState({});

  return (
    <Auth0Provider domain="skylabtic.us.auth0.com"
      clientId="oKQDl3OEiRo10vHyzmgrGtVapysBsPGB"
      redirectUri="https://pacific-retreat-26412.herokuapp.com/Home"
      audience= 'api-autenticacion'>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Switch>
            <Route path="/Home" exact>
              <PrivateLayout>
                <Home />
              </PrivateLayout>
            </Route>
            <Route path="/usuarios" exact>
            <PrivateRoute roleList={['Administrador']}>
              <PrivateLayout>
                <Usuarios />
              </PrivateLayout>
            </PrivateRoute>
            </Route>
            <Route path="/products" exact>
            <PrivateRoute roleList={['Administrador']}>
              <PrivateLayout>
                <Products />
              </PrivateLayout>
              </PrivateRoute>
            </Route>
            <Route path="/Sales" exact>
              <PrivateLayout>
                <Sales />
              </PrivateLayout>
            </Route>
            <Index />

          </Switch>
        </Router>
      </UserContext.Provider>  

    </Auth0Provider>
  );
}

export default App;
