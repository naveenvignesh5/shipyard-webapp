import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import Video from "../pages/video";
import Summary from '../pages/admin/summary';

// Admin Pages
import { AdminDashboard } from "../pages/admin";

import withAuth from '../libs/withAuth';
// Admin router
const AdminRouter = () => (
  <Router>
    <Switch>
      <Route path="/" component={AdminDashboard} />
      <Route path="/video/:id" component={Video} />
      <Route path="/summary/:id" component={Summary} />
    </Switch>
  </Router>
);

// Main Route
const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      {/* <Route path="/home" component={Home} /> */}
      <Route path='/home' component={withAuth(Home)} />
      <Route path='/admin' component={withAuth(AdminRouter)} />
      {/* <Route path="/admin" component={AdminRouter} /> */}
      <Route path="/video/:id" component={Video} />
    </Switch>
  </Router>
);

export { MainRouter }; // eslint-disable-line
