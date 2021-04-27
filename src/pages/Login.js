/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/auth/actions";
import { Tooltip, Zoom } from "@material-ui/core";
import { useSnackbar } from "../contexts/Snackbar";

const Login = ({ socket }) => {
  const [username, setUsername] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState(0);
  const snackbar = useSnackbar();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "") {
      setError(null);
      socket.emit("LOGIN", username.toUpperCase());
      dispatch(
        setUserData({
          username: username.toUpperCase(),
          socketID: socket.id,
          inGame: false,
          ownedRooms: [],
          room: "Lobby",
        })
      );
      socket.emit("POPULATE");
      socket.emit("REFRESH_USERSLIST", username.toUpperCase());
      history.push("/home");
    } else {
      snackbar.set({
        open: true,
        text: "You must provide a valid username.",
        severity: "snackbar-danger",
      });
    }
  };

  const validUsername = username.match(/^[a-zA-Z]{1,10}$/);
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="login p-3 shadow rounded text-center text-white">
          <div>
            <h3>Connect to play!</h3>
          </div>
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="m-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                error={error}
                className="form-control"
                placeholder="Thyrse, Ziphlot..."
                onChange={(e) => handleChange(e)}
                value={username || ""}
              />
            </div>
            <div className="d-flex justify-content-center">
              <Tooltip
                TransitionComponent={Zoom}
                title="Your username must contain between 1 and 10 alphanumeric characters."
              >
                <span className="p-2">
                  <button
                    type="submit"
                    className="btn btn-white"
                    disabled={!validUsername}
                  >
                    Play
                  </button>
                </span>
              </Tooltip>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
