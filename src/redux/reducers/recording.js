import * as types from "../actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  error: {},
  recordings: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_RECORD_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        isError: false,
        error: {}
      });
    case types.LIST_RECORD_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        recordings: action.payload,
      });
    case types.LIST_RECORD_REQUEST_ERROR:
      return Object.assign({}, state, {
          isLoading: false,
          isError: false,
          error: {},
      });
    default:
      return state;
  }
};
