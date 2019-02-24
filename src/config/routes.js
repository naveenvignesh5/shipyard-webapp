import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Login from "../pages/login";
import Register from '../pages/register';
import Home from '../pages/home';

// Main Route
const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/home' component={Home} />
    </Switch>
  </Router>
);

export { MainRouter }; // eslint-disable-line
