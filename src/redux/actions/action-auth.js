import axios from "axios";
import { push, goBack } from "connected-react-router";

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

const registerRequest = () => ({
  type: types.SIGNUP_REQUEST
});

const registerRequestSuccess = user => ({
  type: types.SIGNUP_REQUEST_SUCCESS,
  payload: user
});

const registerRequestError = error => ({
  type: types.SIGNUP_REQUEST_ERROR,
  error
});

const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST,
});

export const login = (username, password, type) => async dispatch => {
  try {
    dispatch(loginRequest());
    const res = await axios.post("/users/login", { username, password });
    if (res.data.username) {
      const tokenRes = await axios.post("/session/token", {
        userid: res.data.id
      });
      const user = {
        ...res.data, // database data
        token: tokenRes.data.token // twilio access token
      };

      dispatch(loginRequestSuccess(user));
      if (type === "client") dispatch(push("/home"));
      else if (type === "speaker") dispatch(push("/admin"));
    }
  } catch (err) {
    dispatch(loginRequestError(err));
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(logoutRequest());
    dispatch(push('/'));
  } catch (err) {
    console.log(err);
  }
}

export const register = (username, password) => async dispatch => {
  try {
    dispatch(registerRequest());
    const res = await axios.post("/users/register", { username, password });
    if (res.data.username) {
      dispatch(registerRequestSuccess(res.data));
      dispatch(goBack());
    }
  } catch (err) {
    console.log("Error caught", err);
    dispatch(registerRequestError(err.data));
  }
};
