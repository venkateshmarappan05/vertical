import React from 'react';
import {Route,Switch} from 'react-router-dom';
import PropTypes from "prop-types";
import UserPages from 'views/masters/user';
import Login from 'views/masters/auth/login';
import Signup from 'views/masters/auth/signup';
import 'assets/css/classic.css'; 
import 'assets/css/styles.css'; 
import '../node_modules/font-awesome/css/font-awesome.css';


const App = ({location}) => (
  <div>
    <Switch>
      <Route location={location} path='/' exact component={Login} />
      <Route location={location} path='/signup' exact component={Signup} />
      <Route location={location} path="/admin/user" exact component={UserPages} />
    </Switch>
  </div>
)

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App