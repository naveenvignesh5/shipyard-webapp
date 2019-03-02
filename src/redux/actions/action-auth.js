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

const getUserRequest = payload => ({
  type: types.LOAD_USER_REQUEST,
  payload
});

const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST
});

export const login = (username, password, role) => async dispatch => {
  try {
    dispatch(loginRequest());
    const res = await axios.post("/users/login", { username, password, role });
    if (res.data.username) {
      const tokenRes = await axios.post("/users/token", {
        userid: res.data.username
      });

      const user = {
        ...res.data, // database data
        token: tokenRes.data.token // twilio access token
      };

      sessionStorage.setItem("user", JSON.stringify(res.data));

      dispatch(loginRequestSuccess(user));
      if (role === "client") dispatch(push("/home"));
      else if (role === "speaker" || role === "admin") dispatch(push("/admin"));
    }
  } catch (err) {
    dispatch(loginRequestError(err));
    alert(err.response.data.message);
  }
};

export const logout = () => async dispatch => {
  try {
    sessionStorage.setItem("user", null);
    dispatch(logoutRequest());
    dispatch(push("/"));
  } catch (err) {
    console.log(err);
  }
};

export const register = (username, password) => async dispatch => {
  try {
    dispatch(registerRequest());
    const res = await axios.post("/users/register", { username, password });
    if (res.data.username) {
      dispatch(registerRequestSuccess(res.data));
      dispatch(goBack());
    }
  } catch (err) {
    alert(err.response.data.message);
    dispatch(registerRequestError(err.data));
  }
};

export const getUser = () => async dispatch => {
  try {
    const data = sessionStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      const tokenRes = await axios.post("/users/token", {
        userid: user.id
      });
      user.token = tokenRes.data.token; // renewing token
      dispatch(getUserRequest(user));
      if (user.role === "client") dispatch(push("/home"));
      else if (user.role === "admin") dispatch(push("/admin"));
    }
  } catch (err) {
    console.log(err);
  }
};
