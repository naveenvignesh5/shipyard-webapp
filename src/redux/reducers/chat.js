import * as types from "../actionTypes";

const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_CHAT_MESSAGES_SUCCESS:
      return Object.assign({}, state, { messages: action.payload });
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
