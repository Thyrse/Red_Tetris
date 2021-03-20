import { createSlice } from "@reduxjs/toolkit";

const listInitialState = {
  roomsList: [],
};

export const roomsSlice = createSlice({
  name: "roomsList",
  initialState: listInitialState,
  reducers: {
    setRooms: (state, { payload }) => {
      console.log("PAYLOAD ROOMS LIST ==>", payload);
      state.roomsList = payload;
    },
  },
});
