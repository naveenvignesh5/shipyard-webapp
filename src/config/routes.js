import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Login from "../pages/login";
import Register from '../pages/register';
import Home from '../pages/home';

// Admin Pages
import { AdminDashboard } from '../pages/admin';

// withAuth
import withAuth from '../libs/withAuth';

// Admin router
const AdminRouter = () => (
  <Router>
    <Switch>
      <Route path= '/' component={AdminDashboard} />
    </Switch>
  </Router>
);

// Main Route
const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/home' component={withAuth(Home)} />
      {/* <Route path='/admin' component={withAuth(AdminRouter)} /> */}
      <Route path='/admin' component={AdminRouter} />
    </Switch>
  </Router>
);


export { MainRouter }; // eslint-disable-line
