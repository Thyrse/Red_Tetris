import { createSlice } from "@reduxjs/toolkit";
import RandomTetrominos from "../../utils/RandomTetrominos";

// import * as actionTypes from "redux/action/types";

const gameInitialState = {
    startGame: false,
    gridGoingUp: 0,
    tetrominoRandom: RandomTetrominos()
};

export const gameSlice = createSlice({
    name: "startGame",
    initialState: gameInitialState,
    reducers: {
            setGameInit: (state, { payload }) => {
                state.startGame = payload;
            },
            setGridGoingUp: (state, { payload }) => {
                // state.gridGoingUp += 1;
                state.gridGoingUp = state.gridGoingUp + payload;
            },
            setTetrominoRandom: (state, {payload}) => {
                state.tetrominoRandom = payload;
            }
    },
});

export const { setGameInit, setGridGoingUp, setTetrominoRandom } = gameSlice.actions;

export default gameSlice.reducer;

export const selectStartGame = (state) => state.startGame.startGame;
