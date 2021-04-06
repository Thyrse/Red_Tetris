import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import "./test.css"

const Grid = ({ grid, tetromino }) => {

    // console.log(tetromino)
	return (
		<div className="gridContainer">
			{ 
                // grid ?
                // console.log("acato==> " + grid) 
                grid.map(
                    (line, y) => {
                        return line.map(
                            (col, x) => {

                                let tetrominosSetting = [];
                                let value = 0;

                                if (x === 0) {
                                    tetrominosSetting.push("first");
                                }
                                if (tetromino !== null) {
                                    if (tetromino.mergeData.indexOf(y + "_" + x) !== -1) {
                                        tetrominosSetting.push("color");
                                        // tetromino.mergeData[0].split
                                        value = tetromino.color
                                    }
                                }
                                if (grid[y][x] > 0) {
                                    tetrominosSetting.push("color");
                                    value = grid[y][x]
                                }

                                return (
                                    <span key={x + "_" + y} className={tetrominosSetting.join(" ")}>
                                        { value }
                                    </span>
                                )
                            }
                        )
                    }
                )
            // :
            //     <span>Loading...</span>
            }
		</div>
	);
};

export default Grid;
