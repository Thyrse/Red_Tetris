/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";
import arrowRightWhite from "../img/arrow_right_white.png";
import Chat from "../components/Chat";

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
              <div className="game-table__cell piece_one"></div>
              <div className="game-table__cell piece_two"></div>
              <div className="game-table__cell piece_three"></div>
              <div className="game-table__cell piece_four"></div>
              <div className="game-table__cell piece_five"></div>
              <div className="game-table__cell piece_six"></div>
              <div className="game-table__cell piece_seven"></div>
              <div className="game-table__cell piece_one"></div>
              <div className="game-table__cell piece_five"></div>
              <div className="game-table__cell piece_three"></div>
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
          <div className="bg-danger game-stats">
            <div className="game-stats__next p-2">
              <div className="game-stats__block">
                <div className="next-line">
                  <div className="next-cell"></div>
                  <div className="next-cell"></div>
                  <div className="next-cell"></div>
                </div>
                <div className="next-line">
                  <div className="next-cell"></div>
                  <div className="next-cell"></div>
                  <div className="next-cell"></div>
                </div>
                <div className="next-line">
                  <div className="next-cell"></div>
                  <div className="next-cell"></div>
                  <div className="next-cell"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Chat />
      </div>
    </>
  );
};

export default Game;
