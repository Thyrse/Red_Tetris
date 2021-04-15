import { createSlice } from "@reduxjs/toolkit";

export const listInitialState = {
  usersList: null,
};

export const usersSlice = createSlice({
  name: "usersList", // name of the slice, used to target
  initialState: listInitialState,
  reducers: {
    setUsersList: (state, { payload }) => {
      // console.log("PAYLOAD USERS LIST ==>", payload);
      state.usersList = payload;
    },
  },
});

export const { setUsersList } = usersSlice.actions;

export default usersSlice.reducer;

export const selectusersList = (state) => state.usersList.usersList;
