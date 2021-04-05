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

	// preview next piece jaja
	componentDidMount() { 
        this.initGame()

        window.addEventListener("keyup", (e) => {
            // console.log(e.key) 
            // 37 left - 39 right - 40 down
            // if(e.key === 'y'){
            //     alert('The sky is your starting point!')
            // }
            // else if (e.key === 'n') {
            //     alert('The sky is your limit👀')
            // }
            switch (e.key) {
                case 'ArrowLeft' : this.pieceMovePosX(-1)
                    break;
                case 'ArrowRight' : this.pieceMovePosX(1)
                    break;
                case 'ArrowDown' : this.pieceMovePosDown(1)
                    break;
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

        let resultCordinate = this.tetrominoIsPosition(tetromino);

        if (resultCordinate !== false) {
            tetromino.mergeData = resultCordinate;

            this.setState({tetromino})
        }
        // console.log(tetromino);
    }

	tetrominoIsPosition = (tetromino) => {
        let coordinate = [];

        for (let y = 0; y < tetromino.grid.length; y++) {
            // console.log("YYY", y)
            for (let x = 0; x < tetromino.grid[0].length; x++) {
                // console.log("XXX", x)
                if (tetromino.grid[y][x] > 0) {
                    // console.log("CHILE" + grid[y])
                    // console.log(this.state.grid[y + tetromino.posY][x + tetromino.posX])
                    if (this.state.grid[y + tetromino.posY] === undefined) {
                        return false
                    }
                    if (this.state.grid[y + tetromino.posY][x + tetromino.posX] === undefined) {
                        return false
                    }
                    if (this.state.grid[y + tetromino.posY][x + tetromino.posX] > 0) {
                        return false
                    }
                    coordinate.push((y + tetromino.posY) + "_" + (x + tetromino.posX));
                }
            }
        }
        return coordinate;
    }

    pieceMovePosX = (moveX) => {
        let tetromino = { ...this.state.tetromino }

        if (tetromino === null) {
            return false
        }

        tetromino.posX += moveX;
        
        let resultCordinate = this.tetrominoIsPosition(tetromino)

        if (resultCordinate !== false) {
            tetromino.mergeData = resultCordinate;
            this.setState({ tetromino })
            console.log("---> ",resultCordinate)
        }
        // console.log(tetromino);
    }

    pieceMovePosDown = (moveDown) => {
        let tetromino = { ...this.state.tetromino }

        if (tetromino === null) {
            return false
        }

        tetromino.posY += moveDown;
        
        let resultCordinate = this.tetrominoIsPosition(tetromino)

        if (resultCordinate !== false) {
            tetromino.mergeData = resultCordinate;
            this.setState({ tetromino })
            console.log("---> ",resultCordinate)
        }
        // console.log(tetromino);
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