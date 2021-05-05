/* eslint-disable array-callback-return */
// REACT
import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setGameInit } from "../redux/game/action";

// REACT ROUTER
// import { Link, useHistory } from "react-router-dom";
// import arrowRight from "../img/arrow_right.png";
// import arrowRightWhite from "../img/arrow_right_white.png";
import Chat from "../components/Chat";

// import Grid from "./Grid";
import Board from "./Board";
import { useDispatch, useSelector } from "react-redux";
// import Start from "./Start";
// import GameB from "./Game_BAK";
const Game = ({ socket }) => {
  //   console.log("Socket on Game ==>", socket);
  const currentUser = useSelector((state) => state.userData.userDatas);
  const roomsList = useSelector((state) => state.roomsList.roomsList);

  return (
    <div className="game">
      {/* {!gameReady ? <Start /> : <Board />} */}
      <Board socket={socket} rooms={roomsList} user={currentUser} />
      {roomsList[roomsList?.findIndex((room) => room.id === currentUser.room)]
        .type === "2" && <Chat socket={socket} />}
    </div>
  );
};

export default Game;
