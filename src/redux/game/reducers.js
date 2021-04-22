import { createSlice } from "@reduxjs/toolkit";

// import * as actionTypes from "redux/action/types";

const gameInitialState = {
    startGame: false
};

export const gameSlice = createSlice({
    name: "startGame",
    initialState: gameInitialState,
    reducers: {
            setGameInit: (state, { payload }) => {
                state.startGame = payload;
        },
    },
});

export const { setGameInit } = gameSlice.actions;

export default gameSlice.reducer;

export const selectStartGame = (state) => state.startGame.startGame;
