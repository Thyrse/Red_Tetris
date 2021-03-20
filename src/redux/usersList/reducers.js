import { createSlice } from "@reduxjs/toolkit";

const listInitialState = {
  usersList: [],
};

export const usersSlice = createSlice({
  name: "usersList",
  initialState: listInitialState,
  reducers: {
    setUsersList: (state, { payload }) => {
      console.log("PAYLOAD USERS LIST ==>", payload);
      state.usersList = payload;
    },
  },
});