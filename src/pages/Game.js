/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameInit } from "../redux/game/action";

// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";
import arrowRightWhite from "../img/arrow_right_white.png";
import Chat from "../components/Chat";

import Grid from "./Grid";
import Board from "./Board";
import Start from "./Start";
import GameB from "./Game_BAK";
const Game = ({ socket }) => {
//   console.log("Socket on Game ==>", socket);

  return (
    <div className="game">
      {/* {!gameReady ? <Start /> : <Board />} */}
      <Board/>
      <Chat socket={socket} />
    </div>
  );
};

export default Game;
