import { createSlice } from "@reduxjs/toolkit";

// import * as actionTypes from "redux/action/types";

const gameInitialState = {
    startGame: false,
    gridGoingUp: 0
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
    },
});

export const { setGameInit, setGridGoingUp } = gameSlice.actions;

export default gameSlice.reducer;

export const selectStartGame = (state) => state.startGame.startGame;
