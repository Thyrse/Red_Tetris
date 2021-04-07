import React from "react";
import Grid from "./Grid";
import Tetromino from "./tetrominos";
import NextTetromino from "./NextTetromino";

class Board extends React.Component{

	state = {
		grid: null,
		gridHeight: 16,
		gridWidth: 8,
		tetromino: null,
        linesCompletes: 0,
        level: 1,
        gameOver: false,
        nextPiece: null
	}

    // keys 9
	// preview next piece jaja
	componentDidMount() { 
        this.initGame()

        let pressedKey = [];
        let pressedMultipleKey = false;

        window.addEventListener("keydown", (e) => {
            if(pressedKey.indexOf(e.key) === -1) {
                pressedKey.push(e.key);
            }

            // console.log(pressedKey)
            if (pressedKey.length > 1) {
                // console.log("2 touches")
                pressedKey.forEach(
                    (key, index) => {
                        // this.executeKeyCode(key)
                        if ( pressedMultipleKey === false && index === 0) {
                            pressedMultipleKey = true
                        } else { 
                            this.executeKeyCode(key)
                        }
                    }
                )
            } else { 
                this.executeKeyCode(pressedKey[0])
                // console.log("1 touches")
            }
            // if (this.pressedKey.length > 1) {
            //     this.pressedKey.forEach(
            //         (keyCode, index) => {
            //             if ( this.multiple_pressedKey === false && index === 0) {
            //                 this.multiple_pressedKey = true
            //             } else { 
            //                 this.executeKeyCode(keyCode)
            //             }
            //         }
            //     )
            // } else { 
            //     this.executeKeyCode(this.pressedKey[0])
            // }
        });


        window.addEventListener("keyup", (e) => {
            pressedMultipleKey = false
            // let index = this.key_pressed.indexOf(e.key)
            // if (index !== -1) { 
            //     this.key_pressed.splice(index, 1)
            // }


            // this.multiple_key_pressed = false
            let index = pressedKey.indexOf(e.key)
            if (index !== -1) { 
                pressedKey.splice(index, 1)
            }



            // console.log(e.key) 
            // 37 left - 39 right - 40 down
            // if(e.key === 'y'){
            //     alert('The sky is your starting point!')
            // }
            // else if (e.key === 'n') {
            //     alert('The sky is your limit👀')
            // }
            
            // switch (e.key) {
            //     case 'ArrowLeft' : this.pieceMovePosX(-1)
            //         break;
            //     case 'ArrowRight' : this.pieceMovePosX(1)
            //         break;
            //     case 'ArrowDown' : this.pieceMovePosDown(1)
            //         break;
            //     case 'ArrowUp' : this.rotatePiece("right")
            //         break;
            //     case 'z' : this.rotatePiece("right")
            //     break;
            //     case 'x' : this.rotatePiece("left")
            //         break;
            //     default: break;
            // }
        });


	}


    initGame = () => {
		this.setState({
			grid: this.buildGrid(),
            nextPiece: this.generateNextPieceIndex()
        }, () => {
            this.makeTetromino()
            
            this.launchTimer()
        })
	}


    executeKeyCode = (key) => {
        switch (key) {
            case 'ArrowLeft' : this.pieceMovePosX(-1)
                break;
            case 'ArrowRight' : this.pieceMovePosX(1)
                break;
            case 'ArrowDown' : this.pieceMovePosDown(1)
                break;
            case 'ArrowUp' : this.rotatePiece("right")
                break;
            case 'z' : this.rotatePiece("right")
                break;
            case 'x' : this.rotatePiece("left")
                break;
            default: break;
        }
		// switch (key) { 
		// 	case this.state.options.touch["right"]: this.pieceMoveToXAxis(1)
		// 		break
		// 	case this.state.options.touch["left"]: this.pieceMoveToXAxis(-1)
		// 		break
		// 	case this.state.options.touch["bottom"]: this.pieceMoveToYAxis(1)
		// 		break
		// 	case this.state.options.touch["rotateRight"]: this.rotatePiece("right")
		// 		break
		// 	case this.state.options.touch["rotateLeft"]: this.rotatePiece("left")
		// 		break
		// 	default: break
		// }
	}

    gameOver = () => {
		//mettre fin au jeu
		clearInterval(this.timer)
		//set status lost game
		this.setState({ gameOver: true })

		//debind event
		// window.removeEventListener("keyup", this.keyupActions)
		// window.removeEventListener("keydown", this.keydownActions)
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
		return grid;
	}

    // level timer
    
    launchTimer = () => {
		this.timer = setInterval(() => {
			this.pieceMovePosDown(1)
		}, this.convertLevelToTime())
	}

    convertLevelToTime = () => { 	
        if (this.state.level === 1) {
            return (10000000000)
        } else if (this.state.level === 2) {
            return 500
        }
		// let interval = this.baseIntervalTimer - (this.state.level - 1) * 35
		// return (interval < 100) ? 100 : interval
	}

	makeTetromino = () => {
        let tetromino = {};
        // tetromino.posX = 0;
        tetromino.posY = 0;

        // let indexTetromino = Math.floor(Math.random() * Tetromino.length);
        let indexTetromino = this.state.nextPiece;
        tetromino.color= indexTetromino + 1;
        
        tetromino.grid = Tetromino[Math.floor(Math.random() * Tetromino.length)];
        // value 0 cordinate = 0 offset y to -1 init spwn
        if (tetromino.grid[0][0] === 0) {
            tetromino.posY--;
        }

        tetromino.posX = Math.floor((this.state.gridWidth - tetromino.grid[0].length) / 2); // premier piece x center piece


        tetromino.mergeData = [];

        // 0 is empty
        // if (tetromino.grid[0][0] === 0) { 
		// 	tetromino.posY--
		// }

        let resultCordinate = this.tetrominoIsPosition(tetromino);
        // console.log(resultCordinate);
        if (resultCordinate !== false) {
            tetromino.mergeData = resultCordinate;

            this.setState({ 
                tetromino, 
                nextPiece: this.generateNextPieceIndex() 
            }, 
            () => {console.log("a")});
        } else {
            clearInterval(this.timer);

            this.gameOver()
            // fingame over
        }
        // console.log(tetromino);
    }

    generateNextPieceIndex() { 
		return Math.floor( Math.random() * Tetromino.length )
	}

    mergePieceToGrid = () => {
        const piece = this.state.tetromino;
        const gridState = this.state.grid;
        let level = this.state.level;
        let levelChanged = false;
        let linesCompletes = this.state.linesCompletes;

        piece.mergeData.forEach(element => {
            const [y, x] = element.split("_");
            gridState[y][x] = this.state.tetromino.color;
        });

        let { cleanGrid, nbrLineCompleted } = this.cleanGrid(gridState);
        linesCompletes += nbrLineCompleted

        // new level reset interval
        if (linesCompletes > 1) {
            level = 2;
            clearInterval(this.timer);
            levelChanged = true;
        }
        
        this.setState({ grid: cleanGrid, piece: null, linesCompletes: linesCompletes, level }, () => {
            this.makeTetromino();

            if (levelChanged) {
                this.launchTimer();
            }
        });
    }

	tetrominoIsPosition = (tetromino) => {
        let cordinate = [];

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
                    cordinate.push((y + tetromino.posY) + "_" + (x + tetromino.posX));
                }
            }
        }
        return cordinate;
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
            // console.log("---> ",resultCordinate)
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
            // console.log("---> ",resultCordinate)
        } else {
            this.mergePieceToGrid();
        }
        // console.log(tetromino);
    }

    rotatePiece = (rotation) => {
        let tetromino = { ...this.state.tetromino }

        if (tetromino === null) {
            return false
        }

        let newGrid = []

        if (rotation === "right") {
            for (let x = tetromino.grid[0].length - 1; x > -1; x--) {
                let line = [];
                for (let y = 0; y < tetromino.grid.length; y++) {
                    // console.log(y + "_" + x + "  >" + tetromino.grid[y][x]);
                    line.push(tetromino.grid[y][x])
                } 
                newGrid.push(line);
            }
        }
        else if (rotation === "left") {
            for (let x = 0; x < tetromino.grid[0].length; x++) {
                let line = [];
                for (let y = tetromino.grid.length - 1; y > -1; y--) {
                    // console.log(y + "_" + x + "  >" + tetromino.grid[y][x]);
                    line.push(tetromino.grid[y][x])
                } 
                newGrid.push(line);
            }
        }
        tetromino.grid = newGrid;

        let resultCordinate = this.tetrominoIsPosition(tetromino);

        if (resultCordinate !== false) {
            tetromino.mergeData = resultCordinate;
            this.setState({ tetromino })
            // console.log("---> ",resultCordinate)
        } else {
            let isPositionUpdate = false
            // without rotation wall grid
            if (tetromino.posX < 0) {
                tetromino.posX = 0;
                isPositionUpdate = true;
            } else if (tetromino.grid[0].length + tetromino.posX  > this.state.gridWidth) {
				tetromino.posX = this.state.gridWidth - tetromino.grid[0].length
				isPositionUpdate = true
			} else if (tetromino.posY < 0) {
				tetromino.posY = 0
				isPositionUpdate = true
			}

			if (isPositionUpdate) { 
				resultCordinate = this.tetrominoIsPosition(tetromino)
				if (resultCordinate !== false) {
					tetromino.mergeData = resultCordinate
					this.setState({ tetromino })
				}
			}
                // resultCordinate = this.tetrominoIsPosition(tetromino);
            //     if (resultCordinate !== false) {
            //         tetromino.mergeData = resultCordinate;
            //         this.setState({ tetromino });
            //         // console.log("---> ",resultCordinate)
            //     } 
            // } else if (tetromino.grid[0].length + this.state.gridWidth > this.state.gridWidth) {
            //     tetromino.posX = this.state.gridWidth - tetromino.grid[0].length;
            //     resultCordinate = this.tetrominoIsPosition(tetromino);
            //     if (resultCordinate !== false) {
            //         tetromino.mergeData = resultCordinate;
            //         this.setState({ tetromino });
            //     }
            // } else if () {
            //     tetromino.grid.length + 
            // }

        }

    }


    cleanGrid = (grid) => {

		let cleanGrid = []
		let nbrLineCompleted = 0

		for (let y = 0; y < this.state.gridHeight; y++) {

			let lineCompleted = true
			for (let x = 0; x < this.state.gridWidth; x++) {
				if (grid[y][x] === 0) { 
					lineCompleted = false
				}
			}

			if (lineCompleted === false) {
				cleanGrid.push(grid[y])
			}

		}

		nbrLineCompleted = this.state.gridHeight - cleanGrid.length

		for (let i = 0; i < nbrLineCompleted; i++) { 
			cleanGrid.unshift( this.makeCleanLine(this.state.gridWidth) )
		}

        // console.log(cleanGrid);

		return { cleanGrid, nbrLineCompleted }

	}

    makeCleanLine(width) { 
		let line = []
		for (let x = 0; x < width; x++) {
			line.push(0)
		}
		return line
	}

	render() { 
		return (
            <>
                <div className="game">
                    <div className="game__pan bg-success p-3" style={{display: "flex", flexDirection: "column"}}>
                        <p className={"score"}>score: { this.state.linesCompletes }</p>
                        <p className={"level"}>level: { this.state.level }</p>
                        {  this.state.nextPiece !== null &&
                            <NextTetromino grid={Tetromino[this.state.nextPiece]}/>
                        }
                        { this.state.gameOver ?
                            <p style={{color: "red", position: "absolute", top: 230, left: 45, fontSize: 30}}>GAME OVER</p>
                        :
                            ""
                        }
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