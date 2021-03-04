/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";
import arrowRightWhite from "../img/arrow_right_white.png";

/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Game = () => {
  return (
    <>
      <div className="game">
        <div className="game__pan bg-success p-3">
          <div className="bg-warning game-table">
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
            <div className="game-table__line">
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
              <div className="game-table__cell"></div>
            </div>
          </div>
          <div className="bg-danger game-stats"></div>
        </div>
      </div>
    </>
  );
};

export default Game;
