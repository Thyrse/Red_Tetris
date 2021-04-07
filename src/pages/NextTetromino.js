import React from 'react'
import "./test.css"

function NextTetromino({ grid }) {
	return (
		<div className="gridContainer">
			<div id="nextTetromino" className="nextTetromino">
			<p className="">NEXT TETROMINO</p>
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
		</div>
	);
};
// 	return (
// 		<div id="containerNextTetromino">
// 			<span className="">NEXT TETROMINO</span>
// 			<div id="nextTetrormino" className="grid">
// 				{
// 					grid.map(
// 						(line, y) => { 
// 							return line.map(
// 								(col, x) => { 

// 									let classes = []

// 									if (x === 0) { 
// 										classes.push("first")
// 									}

// 									if (grid[y][x] > 0) { 
// 										classes.push("color")
// 									}

// 									return <span key={x + "_" + y} className={classes.join(" ")}></span>
// 								}
// 							)
// 						}
// 					)
// 				}
// 			</div>
// 		</div>
// 	)
// }

export default NextTetromino;