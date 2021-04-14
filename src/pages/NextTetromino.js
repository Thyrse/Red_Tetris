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
                    grid.map(
                        (line, y) => {
                            return line.map(
                                (col, x) => {

                                    let tetrominosSetting = [];

                                    if (x === 0) {
                                        tetrominosSetting.push("first");
                                    }
                                    if (grid[y][x] > 0) {
                                        tetrominosSetting.push("color" + color);
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
		</div>
	);
};

export default NextTetromino;