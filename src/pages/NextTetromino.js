import React from 'react'
import "../styles/grid.scss"

function NextTetromino({ grid, color }) {
	return (
		<div className="tetrominoWrapper">
            <div className="tetrominoTitle">
                <p className="">NEXT TETROMINO</p>
            </div>
			<div id="tetrominoContainer" className="gridContainer">
                { 
                    // grid ?
                    // console.log("acato==> " + grid) 
                    grid.map(
                        (line, y) => {
                            return line.map(
                                (col, x) => {

                                    let tetrominosSetting = [];
                                    // let value = 0;

                                    if (x === 0) {
                                        tetrominosSetting.push("first");
                                    }
                                    if (grid[y][x] > 0) {
                                        tetrominosSetting.push("color" + color);
                                        // value = 
                                    }

                                    return (
                                        <span key={x + "_" + y} className={tetrominosSetting.join(" ")}>
                                            {/* { value } */}
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

export default NextTetromino;