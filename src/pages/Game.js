/* eslint-disable array-callback-return */
import React from "react";
import Chat from "../components/Chat";
import Board from "./Board";
import { useSelector } from "react-redux";
const Game = ({ socket }) => {
  const currentUser = useSelector((state) => state.userData.userDatas);
  const roomsList = useSelector((state) => state.roomsList.roomsList);

  return (
    <div className="game">
      <Board socket={socket} rooms={roomsList} user={currentUser} />
      {roomsList[roomsList?.findIndex((room) => room.id === currentUser.room)]
        .type === "2" && <Chat socket={socket} />}
    </div>
  );
};

export default Game;
