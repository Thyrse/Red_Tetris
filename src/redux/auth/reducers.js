import { createSlice } from "@reduxjs/toolkit";

// intialState define state of slice & reducers
export const userInitialState = {
  userDatas: null,
};

// Slice/Reducer Authentication
export const userSlice = createSlice({
  name: "userDatas", // name of the slice, used to target
  initialState: userInitialState, // état initiale
  reducers: {
    setUserData: (state, { payload }) => {
      state.userDatas = payload;
    },
    setDisconnectUser: (state) => {
      state.userDatas = null;
    },
  },
});

export const { setUserData, setDisconnectUser } = userSlice.actions;

export default userSlice.reducer;

export const selectuserDatas = (state) => state.userDatas.userDatas;
