import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";

import thunk from "redux-thunk";

import createRootReducer from "../redux/reducers";

export const history = createHashHistory();

export default createStore(
  createRootReducer(history),
  {}, // initial state
  compose(
    applyMiddleware(routerMiddleware(history), thunk),
  ),
);
