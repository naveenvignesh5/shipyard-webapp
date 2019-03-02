import * as types from "../actionTypes";
import axios from "axios";

const requestChatMessages = () => ({
  type: types.REQUEST_CHAT_MESSAGES
});

const requestChatMessagesSuccess = messages => ({
  type: types.REQUEST_CHAT_MESSAGES_SUCCESS,
  payload: messages
});

const requestChatMessagesFailure = error => ({
  type: types.REQUEST_CHAT_MESSAGES_FAILURE,
  error
});

const sendMessageRequest = () => ({
  type: types.SEND_CHAT_MESSAGE_REQUEST
});

const sendMessageRequestSuccess = payload => ({
  type: types.SEND_CHAT_MESSAGE_REQUEST_SUCCESS,
  payload,
});

const sendMessageRequestError = error => ({
  type: types.SEND_CHAT_MESSAGE_REQUEST_ERROR,
  error,
});

export const listMessages = (channelId) => async (dispatch) => {
  try {
    dispatch(requestChatMessages());
    const res = await axios.get(`/chat/messages/${channelId}`);
    // if (chatRef) chatRef.canvas.scrollIntoView(); // scrolls to last message
    dispatch(requestChatMessagesSuccess(res.data.messages));
  } catch (err) {
    dispatch(requestChatMessagesFailure(err));
  }
};

export const sendMessage = messageData => async (dispatch) =>{
  try {
    const { channelId, message, username } = messageData;

    if (channelId && message && username) {
      dispatch(sendMessageRequest());
      await axios.put('/chat/messages', { channelId, message, username });
      // dispatch(sendMessageRequestSuccess(res.data));
      dispatch(listMessages(channelId));
    } else {
      dispatch(sendMessageRequestError({ message: "Message data object is not proper" }));
    }
  } catch (err) {
    dispatch(sendMessageRequestError({err, message: "Unable to send message" }));
  }
}
