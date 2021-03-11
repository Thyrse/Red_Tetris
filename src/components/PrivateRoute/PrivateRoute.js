import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts";

/**
 * Permet de créer des routes protégées dans notre application
 *
 * @param {{path: string, component: string}} props
 */
const PrivateRoute = ({ path, component, children, render, other }) => {
  // On récupère le contexte d'authentification duquel on extrait uniquement ce qui nous intéresse :
  // Est-ce que la personne est authentifiée ou pas
  // const { isAuthenticated } = useContext(AuthContext);
  // Si elle est authentifiée, on affiche le composant demandé, sinon on redirige vers le login
  console.log("CONTEXT IN PRIVATE ROUTE ==>", useContext(AuthContext));
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Route path={path} component={component} render={render} {...other}>
      {children}
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
