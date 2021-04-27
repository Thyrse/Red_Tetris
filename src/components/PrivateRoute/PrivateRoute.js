import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * @param {{path: string, component: string}} props
 */
const PrivateRoute = ({ path, component, children, render, other }) => {
  // Here we need to check if the user is connected, by checking the store directly
  // Since we dont allow any refresh on page, the user is considerer as logged out upon doing it
  const currentUser = useSelector((state) => state.userData.userDatas);
  return currentUser && currentUser?.socketID ? (
    <Route path={path} component={component} render={render} {...other}>
      {children}
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
