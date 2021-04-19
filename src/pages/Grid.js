import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import GetMirrorTetromino from "../utils/GetMirrorTetromino";
import "../styles/grid.scss";

const Grid = ({ grid, tetromino, gameover }) => {
    
    let mirrorTetromino = []
    if (tetromino) {
        mirrorTetromino = GetMirrorTetromino(grid, tetromino)
    }

	return (
		<div className="gridContainer">
			{ 
                grid.map(
                    (line, y) => {
                        return line.map(
                            (col, x) => {

                                let tetrominosSetting = [];

                                if (x === 0) {
                                    tetrominosSetting.push("first");
                                }
                                if (gameover) {
                                    tetrominosSetting.push("finish");
                                }

                                if (y === 0) {
                                    tetrominosSetting.push("colory");
                                }

                                if (tetromino !== null) {
                                    if (tetromino.mergeData.indexOf(y + "_" + x) !== -1) {
                                        tetrominosSetting.push("color" + tetromino.color);
                                    }
                                }

                                if (mirrorTetromino.indexOf(y + "_" + x) !== -1) {
                                    tetrominosSetting.push("mirror");
                                }

                                if (grid[y][x] > 0) {
                                    tetrominosSetting.push("color" + grid[y][x]); //jugar invisible
                                }

                                return (
                                    <span key={x + "_" + y} className={tetrominosSetting.join(" ")}/>
                                )
                            }
                        )
                    }
                )
            }
		</div>
	);
};

export default Grid;