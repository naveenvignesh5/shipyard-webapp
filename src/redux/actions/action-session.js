import axios from "axios";

import * as types from "../actionTypes";

const createRoomRequest = () => ({
  type: types.CREATE_ROOM_REQUEST
});

const createRoomRequestSuccess = payload => ({
  type: types.CREATE_ROOM_SUCCESS,
  payload
});

const createRoomRequestFailure = error => ({
  type: types.CREATE_ROOM_FAILURE,
  error
});

const listRoomsRequest = () => ({
  type: types.LIST_ROOMS_REQUEST
});

const listRoomsRequestSuccess = payload => ({
  type: types.LIST_ROOMS_SUCCESS,
  payload,
});

const listRoomsRequestFailure = error => ({
  type: types.LIST_ROOMS_FAILURE,
  error,
});

const listRooms = async (config, dispatch) => {
  try {
    dispatch(listRoomsRequest());
    const res = await axios.get("/session", { params: config });
    dispatch(listRoomsRequestSuccess(res.data.rooms));
  } catch (err) {
    dispatch(listRoomsRequestFailure(err));
  }
}

export const listActiveRooms = () => async dispatch => {
  await listRooms({ Status: "in-progress" }, dispatch);
}

export const listCompletedRooms = () => async dispatch => {
  await listRooms({ Status: "completed" }, dispatch);
}

export const createRoom = config => async dispatch => {
  try {
    dispatch(createRoomRequest());
    const res = await axios.post("/session/create", config);
    dispatch(createRoomRequestSuccess(res.data));
  } catch (err) {
    dispatch(createRoomRequestFailure(err));
  }
};

