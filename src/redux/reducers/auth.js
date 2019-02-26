import * as types from "../actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  user: {},
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.SIGNUP_REQUEST:
      return Object.assign({}, state, { isLoading: true, isError: false, error: {} });
    case types.LOGIN_REQUEST_SUCCESS:
    case types.SIGNUP_REQUEST_SUCCESS:
      return Object.assign({}, state, { isLoading: false, user: action.payload });
    case types.LOGIN_REQUEST_ERROR:
    case types.SIGNUP_REQUEST_ERROR:
      return Object.assign({}, state, { isLoading: false, isError: true, error: action.error, user: {} });
    case types.LOGOUT_REQUEST:
      return Object.assign({}, state, { user: {} });
    default:
      return state;
  }
};
