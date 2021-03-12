/**
 * @var {boolean} authState Permet de savoir si on est authentifié ou pas
 */
let authState = false;

export function setupAuthState() {
  authState = true;
}
/**
 * @var {object} authData Les données d'authentification (incluant SID, user et workspace)
 */
let authData = null;
export const setupAuthentication = () => {
  // Récupération des données du storage
  authData = loadAuthDataFromStorage();

  console.log("AUTH DATA IN AUTH.JS ==>", authData);

  // Si il y avait quelque chose dans le storage
  if (authData) {
    // On est authentifié
    authState = true;
  }
  /* console.log(authData, authState); */
};

/**
 * Permet de charger les données à partir du storage
 */
export const loadAuthDataFromStorage = () => {
  return JSON.parse(window.sessionStorage.getItem("userData")) || null;
};

/**
 * Permet d'enregistrer les données d'authentification dans le storage
 *
 * @param {object} data Les données d'authentification (comprenant user, workspace et SID !)
 */
export const saveAuthDataInStorage = (data) => {
  console.log("saveAuthDataInStorage", data);
  window.sessionStorage.setItem("userData", JSON.stringify(data));
};

/**
 * Authentifie un visiteur
 *
 * @param {object} data Les données d'authentificaiton (comprenant user, workspace et SID !)
 */
export const authenticate = (data) => {
  console.log("DATA RECEIVED BY AUTHENTICATE ==>", data);
  console.log("AUTH STATE BEFORE UPDATE ==>", authState);
  authState = true;
  console.log("AUTH STATE AFTER UPDATE ==>", authState);
  authData = data;
  saveAuthDataInStorage(data);
};

/**
 * Retourne le statut d'authentification
 *
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return authState;
};

/**
 * Permet de mettre à jour des données dans le storage
 *
 * @param {object} props Les données à mettre à jour
 */
export const updateStorageData = (props) => {
  // On fusionne le authData actuel et les nouvelles données
  authData = { ...authData, ...props };

  // On stock authData dans le storage
  saveAuthDataInStorage(authData);
  // console.log("UPDATE_STORAGE", props);
};
