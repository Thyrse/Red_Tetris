/* eslint-disable array-callback-return */
// REACT
import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import { Link, useHistory } from "react-router-dom";
import arrowRight from "../img/arrow_right.png";
import arrowRightWhite from "../img/arrow_right_white.png";
import Chat from "../components/Chat";

import Grid from "./Grid";
import Board from "./Board"
/**
 * Component that displays the patient page,
 * contains the list of patients,
 * as well as the components for display and editing,
 * drawers and modal
 */
const Game = ({ socket }) => {
	console.log("Socket on Game ==>", socket);

	return (
		<>
			<div className="game">
				<Board />
				<Chat socket={socket} />
			</div>
		</>
	);
};

export default Game;
