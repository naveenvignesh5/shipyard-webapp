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

const listRoomsRequestSuccess = (rooms, alive) => ({
  type: types.LIST_ROOMS_SUCCESS,
  rooms,
  alive
});

const listRoomsRequestFailure = error => ({
  type: types.LIST_ROOMS_FAILURE,
  error
});

const listRooms = async (alive, dispatch) => {
  try {
    dispatch(listRoomsRequest());
    const res = await axios.get("/session", {
      params: { Status: alive ? "in-progress" : "completed" }
    });

    dispatch(listRoomsRequestSuccess(res.data.rooms, alive));
  } catch (err) {
    dispatch(listRoomsRequestFailure(err));
  }
};

export const listActiveRooms = () => async dispatch => {
  await listRooms(true, dispatch);
};

export const listCompletedRooms = () => async dispatch => {
  await listRooms(false, dispatch);
};

export const createRoom = (name, user) => async dispatch => {
  try {
    dispatch(createRoomRequest());

    const config = {
      name,
      user,
    };

    const res = await axios.post("/session/createWithChat", config);
    dispatch(createRoomRequestSuccess(res.data));
    dispatch(listActiveRooms());
  } catch (err) {
    dispatch(createRoomRequestFailure(err));
  }
};
