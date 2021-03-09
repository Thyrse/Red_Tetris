/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Login = () => {
  const socket = socketIOClient.connect("http://localhost:4000");
  const [username, setUsername] = useState();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const handleSubmit = () => {
    socket.emit("login", username);
  };

  console.log("USERNAME ==>", username);
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="login p-3 shadow rounded text-center text-white">
          <div>
            <h3>Connect to play!</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="m-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                placeholder="Tefourge, Scao..."
                onChange={(e) => handleChange(e)}
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
