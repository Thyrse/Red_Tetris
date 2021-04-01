import { setUserData, setDisconnectUser, setUserDataError } from "./actions";

// THUNK

export const login = (user) => async (dispatch) => {
  console.log("USER SENT TO THUNK ==>", user);
  //   try {
  //     return auth;
  //   } catch (err) {
  //     console.error("AUTHENTICATE_ERROR", err);
  //     dispatch(setUserDataError(err.toString()));
  //   }
};
