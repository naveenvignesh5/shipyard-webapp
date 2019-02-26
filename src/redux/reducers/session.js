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
        roomsLive: action.active ? state.roomsLive.concat(action.payload) : state.roomsLive,
        roomsClosed: !action.active ? state.roomsClosed.concat(action.payload) : state.roomsClosed,
        isLoading: false,
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
