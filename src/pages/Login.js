/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/auth/actions";
import { authenticate, updateStorageData } from "../services/auth";
import { setUsersList } from "../redux/usersList/action";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Login = ({ socket }) => {
  // const socket = socketIOClient.connect("http://localhost:4000");
  const [username, setUsername] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  console.log("Socket on Login ==>", socket);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("LOGIN", username.toUpperCase());
    authenticate({
      username: username.toUpperCase(),
      socketID: socket.id,
    });
    dispatch(
      setUserData({
        username: username.toUpperCase(),
        socketID: socket.id,
        inGame: false,
        ownedRooms: [],
      })
    );
    socket.emit("REFRESH_USERSLIST", username.toUpperCase());
    // dispatch(
    //   setUsersList({ username: username.toUpperCase(), socketID: socket.id })
    // );
    // dispatch(
    //   setUsersList({ username: username.toUpperCase(), socketID: socket.id })
    // );
    // updateStorageData();
    // dispatch(setUserData(username.toUpperCase()));
    history.push("/home");
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="login p-3 shadow rounded text-center text-white">
          <div>
            <h3>Connect to play!</h3>
            {window.location.hash && <h1>Salut les michtos</h1>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="m-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                placeholder="Thyrse, Ziphlot..."
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
