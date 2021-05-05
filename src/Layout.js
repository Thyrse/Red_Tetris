/* eslint-disable array-callback-return */
// REACT
import React, { useState } from "react";
// REACT ROUTER
import { useHistory } from "react-router-dom";
import logo from "./img/logo_test.png";
import disconnect from "./img/power_button.png";
import { useSelector, useDispatch } from "react-redux";
import { setDisconnectUser } from "./redux/auth/actions";
import { Snackbar } from "@material-ui/core";
import { SnackbarContext } from "./contexts/Snackbar";

export const Layout = (props) => {
  const currentUser = useSelector((state) => state.userData.userDatas);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDisconnect = () => {
    props.socket.emit("DISCONNECT", currentUser?.socketID);
    dispatch(setDisconnectUser());
    history.push("/");
  };
  const currentSocket = props.socket;
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: null,
  });

  return (
    <>
      <SnackbarContext.Provider value={{ set: (state) => setSnackbar(state) }}>
        <header className="header p-3 shadow-top__light">
          <div className="header__username">
            <span>{currentUser && currentUser.username}</span>
          </div>
          {window.location.hash ? (
            <div
              onClick={() => history.push("/home")}
              className="header__logo pointer"
            >
              <img alt="Logo Red Tetris" src={logo} />
            </div>
          ) : (
            <div className="header__logo">
              <img alt="Logo Red Tetris" src={logo} />
            </div>
          )}
          <div className="header__disconnect">
            {currentUser && (
              <img
                alt="Deconnexion"
                src={disconnect}
                onClick={(e) => handleDisconnect(e)}
              />
            )}
          </div>
        </header>
        {props.children}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackbar.open}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          autoHideDuration={5000}
          message={snackbar.text}
          className={snackbar.severity}
        />
      </SnackbarContext.Provider>
    </>
  );
};
