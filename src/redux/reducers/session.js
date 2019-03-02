import * as types from "../actionTypes";

const initialState = {
  roomsLive: [],
  roomsClosed: [],
  files: [],
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
        roomsLive: action.alive ? action.rooms : state.roomsLive,
        roomsClosed: !action.alive ? action.rooms : state.roomsClosed,
        isLoading: false
      });
    case types.LIST_ROOMS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isError: true,
        error: action.error
      });
    case types.LIST_FILES_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        files: action.payload,
      });
    default:
      return state;
  }
};
