import 'css/styles.css';
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
  );  
}

export default App;
