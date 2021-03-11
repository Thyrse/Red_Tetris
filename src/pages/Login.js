/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/auth/actions";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Login = () => {
  const socket = socketIOClient.connect("http://localhost:4000");
  const [username, setUsername] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  console.log("SOCKET ==>", socket);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("login", username.toUpperCase());
    dispatch(
      setUserData({ username: username.toUpperCase(), socketID: socket.id })
    );
    // dispatch(setUserData(username.toUpperCase()));
    history.push("/home");
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
