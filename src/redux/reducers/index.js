import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import auth from "./auth";
import session from './session';
import chat from './chat';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  session,
  chat,
});
