import { createSlice } from "@reduxjs/toolkit";

// intialState ( défini l'état initiale de nos slices/reducers)
const userInitialState = {
  userDatas: null,
};

// Slice/Reducer Authentication
export const userSlice = createSlice({
  name: "userDatas", // nom visible dans le redux dev tools
  initialState: userInitialState, // état initiale
  reducers: {
    setUserData: (state, { payload }) => {
      console.log("PAYLOAD RECEIVED ==>", payload);
      // nom de l'action à utiliser pour executer le reducer/slice mais aussi nom qui s'ajoute dans au premier nom des redux dev tools exemple (authUser/setUserData)
      state.userDatas = payload;
    },
    setUserDataError: (state, { payload }) => {
      // nom de l'action à utiliser pour executer le reducer/slice mais aussi nom qui s'ajoute dans au premier nom des redux dev tools exemple (authUser/setUserDataError)
      state.error = payload;
    },
  },
});
