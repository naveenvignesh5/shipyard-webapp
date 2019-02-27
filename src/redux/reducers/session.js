import * as types from "../actionTypes";

const initialState = {
  roomsLive: [],
  roomsClosed: [],
  isLoading: false,
  isError: false,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ROOMS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        isError: false,
        error: {}
      });
    case types.LIST_ROOMS_SUCCESS:
      return Object.assign({}, state, {
        roomsLive: state.roomsLive.concat(action.roomsLive),
        roomsClosed: state.roomsClosed.concat(action.roomsClosed),
        isLoading: false
      });
    case types.LIST_ROOMS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isError: true,
        error: action.error
      });
    default:
      return state;
  }
};
