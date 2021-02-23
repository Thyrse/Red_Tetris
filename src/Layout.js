/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import logo from './img/logo_blue.png'


/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Layout = () => {
  return (
    <>
        <header className="header px-3">
            <div className="header__logo">
                <img alt='Logo Red Tetris'src={logo} />
            </div>
        </header>
    </>
  );
};

export default Layout;
