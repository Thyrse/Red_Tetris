import React from "react";
import Grid from "./Grid";
import Tetromino from "./tetrominos";

class Board extends React.Component{

	state = {
		grid: null,
		gridHeight: 10,
		gridWidth: 8,
		tetromino: null,
	}

	// preview next piece
	componentDidMount() { 
        this.initGame()

        window.addEventListener("keyup", (e) => {
            console.log(e.key) 
            // 37 left - 39 right - 40 down
            switch (e.key) {
                // case e.key[ArrowLeft] === "ArrowLeft" : this.pieceMoveRight()
                    // break;
                    // https://www.youtube.com/watch?v=OclMGj9OefM     3:16
            }
        })
	}


    initGame = () => {
		this.setState({
			grid: this.buildGrid()
        }, () => {
            this.makeTetromino()
        })
	}

	//GRID FUNCTIONS
	buildGrid = () => {
		let grid = []

		for (let y = 0; y < this.state.gridHeight; y++) {
			let line = []
			for (let x = 0; x < this.state.gridWidth; x++) {
				line.push(0);
			}
			grid.push(line)
		}

        // grid[0][0] = 1;
		return grid
	}

	makeTetromino = () => {
        let tetromino = {};
        tetromino.posX = 0;
        tetromino.posY = 0;
        tetromino.grid = Tetromino[0];
        tetromino.mergeData = []

       

        // if (tetromino.grid[0][0] === 0) { 
		// 	tetromino.posY--
		// }

        let result = this.tetrominoIsPosition(tetromino);

        if (result) {
            this.setState({tetromino})
        }
        // console.log(tetromino);
    }

	tetrominoIsPosition = (tetromino) => {
        for (let y = 0; y < tetromino.grid.length; y++) {
            // console.log("YYY", y)
            for (let x = 0; x < tetromino.grid[0].length; x++) {
                // console.log("XXX", x)
                if (tetromino.grid[y][x] > 0) {
                    // console.log("CHILE" + grid[y])
                    // console.log(grid[y + tetromino.posY][x + tetromino.posX])
                    if (this.state.grid[y + tetromino.posY][x + tetromino.posX] > 0) {
                        return false
                    }
                    tetromino.mergeData.push(y + "_" + x);
                }
            }
        }
        return true;
    }

    pieceMoveRight = () => {
        let tetromino = { ...this.state.tetromino }

        if (tetromino === null) {
            return false
        }

        console.log("caca");

        console.log(tetromino);
    }

	render() { 
		return (
            <>
                <div className="game">
                    <div className="game__pan bg-success p-3">
                        { this.state.grid !== null && 
                            <Grid 
                                grid={this.state.grid} 
                                tetromino={this.state.tetromino}
                            />
                        }	
                    </div>
                </div>
            </>
        );
	}

}

export default Board;