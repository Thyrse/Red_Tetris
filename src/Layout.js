/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import logo from "./img/logo_test.png";
import disconnect from "./img/power_button.png";
import { useSelector, useDispatch } from "react-redux";
import { setDisconnectUser } from "./redux/auth/actions";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
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
  console.log("SOCKET IN LAYOUT ==>", currentSocket);

  return (
    <>
      <header className="header p-3 shadow-top__light">
        <div className="header__username">
          <span>{currentUser && currentUser.username}</span>
        </div>
        <div className="header__logo">
          <img alt="Logo Red Tetris" src={logo} />
        </div>
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
    </>
  );
};
