import React, { Component } from "react";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import store from "./config/store";
import { MainRouter } from "./config/routes";

import { history } from './config/store';

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <MainRouter />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
