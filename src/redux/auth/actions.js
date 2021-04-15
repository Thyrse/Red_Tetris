/**
 * Actions utilisable partout dans l'app.
 * Chaque actions est définie dans le reducers de son dossier
 */
import { userSlice } from "./reducers";

/**
 * Actions liées au reducer/slice Authentication
 */
export const { setUserData, setDisconnectUser } = userSlice.actions;
