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
const Login = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="login p-3 shadow rounded text-center text-white">
          <div>
            <h3>Connect to play!</h3>
          </div>
          <form>
            <div className="m-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                placeholder="Tefourge, Scao..."
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-white">
                Play
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
