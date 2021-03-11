import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { userSlice } from "./auth/reducers";

/**
 * Store de l'application renvoyé au provider dans App.js, on récupere le reducer de chaque Slices/Reducers que l'on combine en 1 objet
 */
const reducer = combineReducers({
  userData: userSlice.reducer,
});

/**
 * Permet d'utiliser le middleWare par defaut de redux-toolkit, et ajout d'un middleware qui permet de log l'état de nos Slices/Reducers, avant/pendant/apres utilisation
 */
const middleware = [...getDefaultMiddleware(), logger];
// const middleware = [...getDefaultMiddleware()];

/**
 * On export le store et nos middleWare afin de pouvoir l'ajouter au provider de App.js
 */
export default configureStore({
  reducer,
  middleware,
});
