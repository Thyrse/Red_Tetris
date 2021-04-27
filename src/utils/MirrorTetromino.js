import React, { useState, useEffect, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGridGoingUp } from "../redux/game/action";

const MirrorTetromino = (grid, tetromino, gridGoingUp, gameReady) => {
    let previousCordinate = [];
    let cordinate = [];
    let mirrorY = tetromino.posY;
    // const gridGoingUp = useSelector((state) => state.startGame.gridGoingUp);

    // console.log(gridGoingUp)
    // const gameReady = useSelector((state) => state.startGame.startGame);

    if (gameReady === true) {
        while (mirrorY < grid.length) {

            previousCordinate = cordinate;
            cordinate = [];
            let y = 0
            while (y < tetromino.grid.length) {
                // console.log("YYY", y)
                let x = 0;
                while (x < tetromino.grid[0].length) {
                    // console.log("XXX", x)
                    if (tetromino.grid[y][x] > 0) {
                        // console.log(grid[y])
                        // console.log(this.state.grid[y + tetromino.posY][x + tetromino.posX])
                        
                        // ACA ESTA EL ULTIMO
                        if (grid[y + mirrorY + gridGoingUp] === undefined) {
                            return previousCordinate;
                        }
                        if (grid[y + mirrorY][x + tetromino.posX] > 0) {
                            return previousCordinate;
                        }

                        cordinate.push((y + mirrorY) + "_" + (x + tetromino.posX));
                    }
                    x++;
                }
                y++;
            }
            mirrorY++;
        }
    }
    return cordinate;
}

export default MirrorTetromino;
