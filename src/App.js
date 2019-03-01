import React, { Component } from "react";

import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ConnectedRouter } from "connected-react-router";

import { MainRouter } from "./config/routes";

import store from "./config/store";
import { history } from "./config/store";

import { getUser } from './redux/actions/action-auth';

class App extends Component {
  state = {};

  componentDidMount() {
    this.props.getUser();  
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <MainRouter />
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateFromProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch);

const AppWithUser = connect(mapStateFromProps, mapDispatchToProps)(App);

export default () => (
  <Provider store={store}>
    <AppWithUser />
  </Provider>
);
