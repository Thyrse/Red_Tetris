/**
 * @var {boolean} authState Permet de savoir si on est authentifié ou pas
 */
let authState = false;
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
 * Retourne le statut d'authentification
 *
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return authState;
};
/**
 * Permet d'enregistrer les données d'authentification dans le storage
 *
 * @param {object} data Les données d'authentification (comprenant user, workspace et SID !)
 */
export const saveAuthDataInStorage = (data) => {
  // console.log("saveAuthDataInStorage", data);
  window.sessionStorage.setItem("authData", JSON.stringify(data));
};

/**
 * Authentifie un visiteur
 *
 * @param {object} data Les données d'authentificaiton (comprenant user, workspace et SID !)
 */
export const authenticate = async (data) => {
  authState = true;
  authData = data;
  saveAuthDataInStorage(data);
};
