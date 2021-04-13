import React from "react";

import Grid from "./Grid";

import NextTetromino from "./NextTetromino";

import BuildGrid from "../utils/BuildGrid";
import CleanGrids from "../utils/CompletesLines";

import Tetromino from "./Tetrominos";
import "../styles/grid.scss";

class Board extends React.Component{

	state = {
		grid: null,
		gridHeight: 20,
		gridWidth: 10,
		tetromino: null,
        linesCompletes: 0,
        level: 1,
        lineslevelUp: 3,
        gameOver: false,
        nextPiece: null,
        timer: 0,
        score: 0
	}


    //27level lines
    // keys 9
	// preview next piece jaja
	componentDidMount() { 
        this.initGame()
	}

    // componentWillUnmount() {
		
	// }
    keyboardUp = (e) => {
        this.pressedMultipleKey = false
        // let index = this.key_pressed.indexOf(e.key)
        // if (index !== -1) { 
        //     this.key_pressed.splice(index, 1)
        // }


        // this.multiple_key_pressed = false
        let index = this.pressedKey.indexOf(e.key)
        if (index !== -1) { 
            this.pressedKey.splice(index, 1)
        }
    }

    keyboardDown = (e) => {
        // let this.pressedKey = [];
        // let this.pressedMultipleKey = false;

        if(this.pressedKey.indexOf(e.key) === -1) {
            this.pressedKey.push(e.key);
        }

        // console.log(this.pressedKey)
        if (this.pressedKey.length > 1) {
            // console.log("2 touches")
            this.pressedKey.forEach(
                (key, index) => {
                    // this.executeKeyCode(key)
                    if ( this.pressedMultipleKey === false && index === 0) {
                        this.pressedMultipleKey = true
                    } else { 
                        this.executeKeyCode(key)
                    }
                }
            )
        } else { 
            this.executeKeyCode(this.pressedKey[0])
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
    }

    initGame = () => {
        console.log("game-start")

        this.baseIntervalTimer = 1500;
		// this.globalTimer = 0
        this.pressedKey = [];
        this.pressedMultipleKey = false;
        

        window.addEventListener("keydown", this.keyboardDown);
        window.addEventListener("keyup", this.keyboardUp);

		this.setState({
            gameOver: false,
			grid: BuildGrid(this.state.gridHeight, this.state.gridWidth),
            nextPiece: this.generateNextPiece()
        }, () => {
            this.makeTetromino()
            this.handleGameTime()
            this.launchTimer()
        })
	}

    restart = () => {
        this.setState({ 
            linesCompletes: 0,
            level: 1, 
            score: 0,
            timer: 0
        })
        this.initGame();
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
	}

    gameOver = () => {
		//mettre fin au jeu
		clearInterval(this.timer)
		//set status lost game
        
		this.setState({ gameOver: true })

        if (this.state.gameOver) {
            console.log("game-over")
            window.removeEventListener("keyup", this.keyboardUp);
		    window.removeEventListener("keydown", this.keyboardDown);
        }
		//debind event
		// window.removeEventListener("keyup", this.keyupActions);
		// window.removeEventListener("keydown", this.keydownActions);
	}
	//GRID FUNCTIONS
	//  = () => {
	// 	let grid = []

	// 	for (let y = 0; y < this.state.gridHeight; y++) {
	// 		let line = []
	// 		for (let x = 0; x < this.state.gridWidth; x++) {
	// 			line.push(0);
	// 		}
	// 		grid.push(line)
	// 	}
    //     // grid[0][0] = 1;
	// 	return grid;
	// }

    // level timer
    
    launchTimer = () => {
		this.timer = setInterval(() => {
			this.pieceMovePosDown(1)
		}, this.convertLevelToTime())
	}

    convertLevelToTime = () => { 	
		let interval = this.baseIntervalTimer / this.state.level;
        // console.log("vitesse:" + interval);
		return (interval < 100) ? 100 : interval

        // if (this.state.level === 1) {
        //     return (10000000)
        // } else if (this.state.level === 2) {
        //     return 50000000
        // }
		// let interval = this.baseIntervalTimer - (this.state.level - 1) * 35
		// return (interval < 100) ? 100 : interval
	}

    generateNextPiece() { 
		return (Math.floor( Math.random() * Tetromino.length ));
	}

    //  finish
	makeTetromino = () => {

        //  finish por aca esta el problema de la ultima Y creo
        let tetromino = {};
        // tetromino.posX = 0;
        tetromino.posY = 0; // ?????????

        // let indexTetromino = Math.floor(Math.random() * Tetromino.length);
        let indexTetromino = this.state.nextPiece;
        tetromino.color= indexTetromino + 1;
        
        tetromino.grid = Tetromino[indexTetromino];
        // tetromino.grid = Tetromino[Math.floor(Math.random() * Tetromino.length)];
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
                nextPiece: this.generateNextPiece() 
            });
            // () => {console.log("a")}
            
        } else {
            clearInterval(this.timer);
            clearInterval(this.gameTimer);
            this.gameOver()
            // fingame over
        }
        // console.log(tetromino);
    }

    
    // check score system
    mergeTetrominoToGrid = () => {
        const piece = this.state.tetromino;
        const gridState = this.state.grid;
        let score = this.state.score;
        let level = this.state.level;
        let levelChanged = false;
        let linesCompletes = this.state.linesCompletes; // level score for lines completes

        piece.mergeData.forEach(element => {
            const [y, x] = element.split("_");
            gridState[y][x] = this.state.tetromino.color;
        });

        let { cleanGrid, numberLinesReady } = CleanGrids(gridState, this.state.gridHeight, this.state.gridWidth);
        linesCompletes += numberLinesReady

        // new level reset interval
        if (numberLinesReady > 0) {
            score += ((numberLinesReady * numberLinesReady) * 10);
            // score += parseInt(Math.pow(numberLinesReady, 2) * level * this.convertLevelToTime())
            // console.log("LEVEL 2")

            if (linesCompletes > this.state.lineslevelUp) {
                linesCompletes = 0;
                level++;
                levelChanged = true;
                clearInterval(this.timer);
            }
            
            // level = 2;
            //update score
            // score += parseInt(Math.pow(nbrLineCompleted, 2) * lvl * this.convertLvlToTime())
			
			//changement of lvl
			// if (nbrCleanLine >= this.state.linePerLvl) { 
			// 	nbrCleanLine = 0
			// 	lvl++
			// 	lvlChanged = true
			// 	clearInterval(this.timer)
			// }
        }
        
        this.setState({ grid: cleanGrid, piece: null, linesCompletes, level, score }, () => {
            this.makeTetromino();

            if (levelChanged) {
                this.launchTimer();
            }
        });
    }

    // terminado
	tetrominoIsPosition = (tetromino) => {
        let cordinate = [];

        // y por aca tambien
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

    // terminado
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
    
    // terminado
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
            this.mergeTetrominoToGrid();
        }
        // console.log(tetromino);
    }

    // check this function totation not final
    rotatePiece = (rotation) => {
        let tetromino = { ...this.state.tetromino }

        if (tetromino === null) {
            return false
        }

        let newGrid = []


        if (rotation === "right") {
            // console.log("que wa ",tetromino.grid[0].length)
            for (let x = tetromino.grid[0].length - 1; x > -1; x--) {
            // for (let x = 0; x < tetromino.grid[0].length; x++) {
                let line = [];
                // for (let y = tetromino.grid.length - 1; y > -1; y--) {
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

    // complete
    handleGameTime() {
        this.gameTimer = setInterval(() => {
            this.setState({ timer: this.state.timer + 1 });
        //   setTimer((timer) => timer + 1)
        }, 1000)
    }

	render() { 
		return (
            <>
                <div className="game__pan p-3 bg" style={{display: "flex", background: "#353841"}}>
                    <div className="game__pan bg">
                        <div style={{paddingTop: "10px"}}>
                            { this.state.grid !== null && 
                                <Grid 
                                    grid={this.state.grid} 
                                    tetromino={this.state.tetromino}
                                    gameover={this.state.gameOver}
                                />
                            }
                        </div>
                        <div className="gameComponents" style={{marginLeft: 20, color: "white", display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start", justifyContent: "space-between",
                            paddingTop: "10px", paddingBottom: "5px"}}>
                                
                            <div>
                                <div className={"level"} style={{display: "flex",
                                        alignItems: "flex-start", justifyContent: "space-between", background: "#b503fc", width: "150px"}}>
                                    <p>Level</p>
                                    <p>{ this.state.level }</p>
                                </div>
                                {  this.state.nextPiece !== null &&
                                        <NextTetromino 
                                            grid={Tetromino[this.state.nextPiece]}
                                            color={this.state.nextPiece + 1}
                                        />
                                }
                            </div>
                            { this.state.gameOver ?
                                <div >
                                    <p className={"gameover"}>GAME</p>
                                    <p className={"gameover"}>OVER</p>
                                    <button style={{background: "white", width: "150px", textAlign: "center", marginBottom: "5px"}} onClick={() => this.initGame()}>Continue ?</button>
                                    <button style={{background: "white", width: "150px", textAlign: "center", }} onClick={() => this.restart()}>Play again</button>

                                </div>
                            :
                                ""
                            }
                            <div>
                                <div className={"score"} style={{display: "flex",
                                    alignItems: "flex-start", justifyContent: "space-between", background: "#fc037f", width: "150px"}}>
                                    <p className={""}>Score</p>
                                    <p className={""}>{ this.state.score }</p>
                                </div>
                                <div className={"line"} style={{display: "flex",
                                    alignItems: "flex-start", justifyContent: "space-between", background: "#03fc3d", width: "150px"}}>
                                    <p className={""}>Lines</p>
                                    <p className={""}>{ this.state.linesCompletes}/{this.state.lineslevelUp}</p>
                                </div>
                                <div className={"time"} style={{display: "flex",
                                    alignItems: "flex-start", justifyContent: "space-between", background: "#2003fc", width: "150px",
                                    border: `5px outset #fc0303 !important`}}>
                                    <p className={""}>Timer</p>
                                    <p className={""}>{ this.state.timer }</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </>
        );
	}

}

export default Board;
