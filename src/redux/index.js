import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { userSlice } from "./auth/reducers";
import { usersSlice } from "./usersList/reducers";
import { roomsSlice } from "./rooms/reducers";
import { gameSlice } from "./game/reducers";

/**
 * App store sended to provider (linked in App.js), retrieve Slices and Reducers here in one object only
 */
const reducer = combineReducers({
  userData: userSlice.reducer,
  listUsers: usersSlice.reducer,
  roomsList: roomsSlice.reducer,
  startGame: gameSlice.reducer,
});

/**
 * Get the default redux-toolkit middleware and log the Slices & Reducers states
 */
const middleware = [...getDefaultMiddleware(), logger];
// const middleware = [...getDefaultMiddleware()];

/**
 * Export store
 */
export default configureStore({
  reducer,
  middleware,
});
