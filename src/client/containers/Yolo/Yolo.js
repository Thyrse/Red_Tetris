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
const Yolo = () => {
    console.log("Yolo WORLD !!!")
  return (
    <div>
      <h1>Salut les gens</h1>
      <Link to="/yolo">Redirection</Link>
    </div>
  );
};

export default Yolo;
