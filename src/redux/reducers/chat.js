import * as types from "../actionTypes";

const initialState = {
  messages: [],
  isLoading: false,
  isError: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_CHAT_MESSAGES:
      return Object.assign({}, state, { isLoading: false, isError: false, error: {} });
    case types.REQUEST_CHAT_MESSAGES_SUCCESS:
      return Object.assign({}, state, { messages: action.payload });
    case types.REQUEST_CHAT_MESSAGES_FAILURE:
      return Object.assign({}, state, { error: action.error, isError: true });
    case types.SEND_CHAT_MESSAGE_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        messages: state.messages.concat(action.payload)
      });
    case types.LOGOUT_REQUEST:
      return Object.assign({}, state, { messages: [] });
    default:
      return state;
  }
};
