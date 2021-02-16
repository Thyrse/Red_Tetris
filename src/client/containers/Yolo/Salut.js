/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Salut = () => {
    console.log("HELLO WORLD !!!")
  return (
    <div>
      <h1>Hello World!</h1>
      <Link to="/salut">Redirection salut</Link>
    </div>
  );
};

export default Salut;
