import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import "../styles/grid.scss";

const Grid = ({ grid, tetromino, gameover }) => {
    
    let mirrorTetromino = []
    if (tetromino) {
        mirrorTetromino = getMirrorTetromino(grid, tetromino)
        // let mirrorTetromino = getMirrorTetromino(grid, tetromino, 7)

        // console.log(mirrorTetromino)

    }
    // console.log(tetromino)


	return (
		<div className="gridContainer">
			{ 
                // grid ?
                grid.map(
                    (line, y) => {
                        return line.map(
                            (col, x) => {

                                let tetrominosSetting = [];
                                let value = 0;

                                if (x === 0) {
                                    tetrominosSetting.push("first");
                                }

                                
                                if (gameover) {
                                    // if (y === 0 && x === 3) {
                                    //     tetrominosSetting.push("last");    
                                    // }
                                        tetrominosSetting.push("finish");
                                }

                                if (y === 0) {
                                    tetrominosSetting.push("colory");
                                }

                                if (tetromino !== null) {
                                    if (tetromino.mergeData.indexOf(y + "_" + x) !== -1) {
                                        tetrominosSetting.push("color" + tetromino.color);
                                        // tetromino.mergeData[0].split
                                        // value = tetromino.color
                                    }
                                }

                                if (mirrorTetromino.indexOf(y + "_" + x) !== -1) {
                                    tetrominosSetting.push("mirror");
                                }

                                if (grid[y][x] > 0) {
                                    tetrominosSetting.push("color" + grid[y][x]); //jugar invisible
                                    // value = 
                                }

                                return (
                                    <span key={x + "_" + y} className={tetrominosSetting.join(" ")}/>
                                    //     { value }
                                    // </span>
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

function getMirrorTetromino(grid, tetromino) {

    let previousCordinate = [];
    let cordinate = [];

        for (let mirrorY = tetromino.posY; mirrorY < grid.length; mirrorY++) {

            previousCordinate = cordinate;
            cordinate = [];

            for (let y = 0; y < tetromino.grid.length; y++) {
                // console.log("YYY")
                for (let x = 0; x < tetromino.grid[0].length; x++) {
                    // console.log("XXX", x)
                    if (tetromino.grid[y][x] > 0) {
                        // console.log("CHILE" + grid[y]) 16:00 #11
                        // console.log(this.state.grid[y + tetromino.posY][x + tetromino.posX])
                        if (grid[y + mirrorY] === undefined) {
                            // console.log("YXXXYY")

                            return previousCordinate;
                        }
                        
                        
                        if (grid[y + mirrorY][x + tetromino.posX] > 0) {
                            return previousCordinate;
                        }

                        cordinate.push((y + mirrorY) + "_" + (x + tetromino.posX));
                    }
                }
            }
        }

        
        return cordinate;
}

export default Grid;