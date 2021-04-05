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

                                return <span key={x + "_" + y} className={
                                    ((x === 0) ? "first" : "") + " " + 
                                    ((tetromino !== null && tetromino.mergeData.indexOf(y + "_" + x) !== -1) ? 'color' : "")
                                }>
                                    { 
                                    (tetromino !== null) ?
                                        (tetromino.mergeData.indexOf(y + "_" + x) !== -1) ? 
                                            "1" 
                                        : 
                                            grid[y][x] 
                                    :
                                        grid[y][x] 
                                    }
                                </span>
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
