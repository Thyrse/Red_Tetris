import React, { useState, useEffect } from "react";
import { ListGroupItemHeading } from "reactstrap";
import Grid from "./Grid";
import Tetromino from "./tetrominos";
import useStateCallback from "./useStateCallback";

const Board = () => {
	const [grid, setGrid] = useStateCallback(null);
    const [tetromino, setTetromino] = useState(null);

	const gridHeight = 10
	const gridWidth = 8

	useEffect(() => {
		initGame()
	}, []);

    const initGame = () => {
		// event.preventDefault();
		setGrid(buildGrid(), () => makeTetromino())
        
	}

    // componentDidMount() {
	// 	initGame();
    // }

    // grid
	const buildGrid = () => {
		let grid = [];

		for (let y = 0; y < gridHeight; y++) {
			let line = []

			for (let x = 0; x < gridWidth; x++) {
				line.push(0);
			}
			grid.push(line);
		}

		// console.log(grid);
		return grid;
	}

    // tetromino
    const makeTetromino = () => {
        let tetromino = {};
        tetromino.posX = 0;
        tetromino.posY = 0;
        tetromino.grid = Tetromino[0];

        // if (tetromino.grid[0][0] === 0) { 
		// 	tetromino.posY--
		// }

        let result = tetrominoIsPosition(tetromino);

        console.log(result);
        // console.log(tetromino);
    }
    
    const tetrominoIsPosition = (tetromino) => {
        for (let y = 0; y < tetromino.grid.length; y++) {
            console.log("YYY", y)
            for (let x = 0; x < tetromino.grid[0].length; x++) {
                console.log("XXX", x)
                if (tetromino.grid[y][x] > 0) {
                    console.log("CHILE" + grid[y])
                    // console.log(grid[y + tetromino.posY][x + tetromino.posX])
                    // if (grid[y + tetromino.posY][x + tetromino.posX] > 0) {
                    //     return false
                    // }
                }
            }
        }
        return true;
    }
	

	return (
		<>
			<div className="game">
				<div className="game__pan bg-success p-3">
					{ grid !== null && 
						<Grid grid={grid} tetrormino={tetromino}/>
					}	
				</div>
			</div>
		</>
	);
};

export default Board;