import { createSlice } from "@reduxjs/toolkit";

export const listInitialState = {
  roomsList: [],
};

export const roomsSlice = createSlice({
  name: "roomsList", // name of the slice, used to target
  initialState: listInitialState,
  reducers: {
    setRooms: (state, { payload }) => {
      state.roomsList = payload;
    },
  },
});

export const { setRooms } = roomsSlice.actions;

export default roomsSlice.reducer;

export const selectroomsList = (state) => state.roomsList.roomsList;
