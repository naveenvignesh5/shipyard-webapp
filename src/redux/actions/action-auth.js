import axios from "axios";
import { push } from "connected-react-router";

import * as types from "../actionTypes";

const loginRequest = () => ({
  type: types.LOGIN_REQUEST
});

const loginRequestSuccess = user => ({
  type: types.LOGIN_REQUEST_SUCCESS,
  payload: user
});

const loginRequestError = error => ({
  type: types.LOGIN_REQUEST_ERROR,
  error
});

export const login = (username, password) => async dispatch => {
  try {
    dispatch(loginRequest());
    const res = await axios.post("/users/login", { username, password });
    if (res.data.username) {
      dispatch(loginRequestSuccess(res.data));
      dispatch(push('/home'));
    }
  } catch (err) {
    dispatch(loginRequestError(err));
  }
};
