import React from "react";

import Grid from "./Grid";

import NextTetromino from "./NextTetromino";
import AudioTetris from "./audioTetris";

import BuildGrid from "../utils/BuildGrid";
import CleanGrids from "../utils/CompletesLines";

import GameOptions from "../components/GameOptions"
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
        score: 0,
        lifes: 0,
        nextLifes: 0,
        lifeGameOver: 0,
        stayalive: 4,
        audioMute: false
	}

	componentDidMount() {
        this.initGame();
	}

    initGame = () => {
        console.log("game-start");

        // put in options
        this.levelTimeSpeed = 1500;

        this.pressedKey = [];
        this.pressedMultipleKey = false;
        
        window.addEventListener("keyup", this.keyboardUp);
        window.addEventListener("keydown", this.keyboardDown);
		this.setState({
            gameOver: false,
			grid: BuildGrid(this.state.gridHeight, this.state.gridWidth),
            nextPiece: this.generateNextPiece(),
        }, () => {
            this.makeTetromino()
            this.handleGameTime()
            this.launchTimer()
            
        })
	}

    keyboardUp = (e) => {
        this.pressedMultipleKey = false;
        let index = this.pressedKey.indexOf(e.key);

        if (index !== -1) { 
            this.pressedKey.splice(index, 1);
        }
    }

    keyboardDown = (e) => {
        if(this.pressedKey.indexOf(e.key) === -1) {
            this.pressedKey.push(e.key);
        }

        // we put the key in array so we can 
        // press two or more keys at the same time
        if (this.pressedKey.length > 1) {
            this.pressedKey.forEach(
                (key, index) => {
                    if ( this.pressedMultipleKey === false && index === 0) {
                        this.pressedMultipleKey = true
                    } else { 
                        this.executeKeyCode(key)
                    }
                }
            )
        } else { 
            // one press
            this.executeKeyCode(this.pressedKey[0])
        }
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

    restart = () => {
        this.setState({ 
            linesCompletes: 0,
            level: 1, 
            score: 0,
            timer: 0,
            lifes: 0,
            nextLifes: 0,
            lifeGameOver: 0,
            stayalive: 4
        })
        this.initGame();
    }

    gameOver = () => {
		clearInterval(this.timer)

		//set status lost game
		this.setState({ gameOver: true })
        
        if (this.state.gameOver) {
            console.log("game-over");
            this.lifeGameSystem();
            window.removeEventListener("keyup", this.keyboardUp);
		    window.removeEventListener("keydown", this.keyboardDown);
        }
	}

    // level timer
    launchTimer = () => {
		this.timer = setInterval(() => {
			this.pieceMovePosDown(1)
		}, this.levelUpSpeed())
	}

    levelUpSpeed = () => { 	
		let interval = this.levelTimeSpeed / this.state.level;
        // console.log("vitesse:" + interval);
		return (interval < 100) ? 100 : interval
	}

    generateNextPiece() { 
		return (Math.floor( Math.random() * Tetromino.length ));
	}

	makeTetromino = () => {
        let tetromino = {};
        let indexTetromino = this.state.nextPiece;

        tetromino.posY = 0;
        tetromino.color= indexTetromino + 1;
        tetromino.grid = Tetromino[indexTetromino];

        // value 0 cordinate = 0 offset y to -1 init spwn
        if (tetromino.grid[0][0] === 0) {
            tetromino.posY--;
        }

        // premier piece x center piece
        tetromino.posX = Math.floor((this.state.gridWidth - tetromino.grid[0].length) / 2); 
        tetromino.mergeData = [];

        let resultCordinate = this.tetrominoIsPosition(tetromino);
        // console.log(resultCordinate);
        if (resultCordinate !== false) {
            tetromino.mergeData = resultCordinate;
            this.setState({ 
                tetromino, 
                nextPiece: this.generateNextPiece() 
            });
        } else {
            clearInterval(this.timer);
            clearInterval(this.gameTimer);
            this.gameOver()
        }
    }

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
            if (linesCompletes > this.state.lineslevelUp) {
                linesCompletes = 0;
                level++;
                levelChanged = true;
                clearInterval(this.timer);
            }
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
        let y = 0; 

        while (y < tetromino.grid.length) {
            // console.log("YYY", y);
            let x = 0; 
            while (x < tetromino.grid[0].length) {
                // console.log("XXX", x)
                if (tetromino.grid[y][x] > 0) {
                    // console.log(grid[y])
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
                x++;
            }
            y++;
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
            // console.log(resultCordinate)
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
        } else {
            this.mergeTetrominoToGrid();
        }
    }

    rotatePiece = (rotation) => {
        let tetromino = { ...this.state.tetromino }
        if (tetromino === null) {
            return false
        }

        let newGrid = []
        if (rotation === "right") {
            // console.log(tetromino.grid[0].length)
            let x = tetromino.grid[0].length - 1;
            while (x > -1) {
                let line = [];
                let y = 0;
                while (y < tetromino.grid.length) {
                    // console.log(y + "_" + x + "  >" + tetromino.grid[y][x]);
                    line.push(tetromino.grid[y][x]);
                    y++;
                } 
                newGrid.push(line);
                x--;
            }
        }
        else if (rotation === "left") {
            let x = 0;
            while ( x < tetromino.grid[0].length) {
                let line = [];
                let y = tetromino.grid.length - 1;
                while (y > -1) {
                    // console.log(y + "_" + x + "  >" + tetromino.grid[y][x]);
                    line.push(tetromino.grid[y][x]);
                    y--;
                } 
                newGrid.push(line);
                x++;
            }
        }
        tetromino.grid = newGrid;

        let resultCordinate = this.tetrominoIsPosition(tetromino);
        if (resultCordinate !== false) {
            tetromino.mergeData = resultCordinate;
            this.setState({ tetromino })
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
        }
    }

    handleGameTime() {
        this.gameTimer = setInterval(() => {
            this.setState({ timer: this.state.timer + 1 });
        }, 1000)
    }

    lifeGameSystem() {
        // console.log("this.state.stayalive" + this.state.stayalive)
        this.setState({stayalive: this.state.stayalive - 1})

        if (this.state.stayalive === 4) {
            this.setState({
                lifes: 1
            });
        } else if (this.state.stayalive === 3) {
            this.setState({
                nextLifes: 1
            }); 
        } else if (this.state.stayalive === 2) {
            this.setState({
                lifeGameOver: 1
            }); 
        }
    }

	render() { 
		return (
            <>
                <div className="game__pan p-3 bg">
                    <div className="game__pan">
                        <div className="gameGridContainer">
                            { this.state.grid !== null && 
                                <Grid 
                                    grid={this.state.grid} 
                                    tetromino={this.state.tetromino}
                                    gameover={this.state.gameOver}
                                />
                            }
                        </div>
                        <div className="gameComponentsContainer">
                            <div>
                                <GameOptions className={"gameComponentslevel"} title={"Level"} state={this.state.level}/>
                                {  this.state.nextPiece !== null &&
                                        <NextTetromino 
                                            grid={Tetromino[this.state.nextPiece]}
                                            color={this.state.nextPiece + 1}
                                        />
                                }
                            </div>
                            { this.state.gameOver ?
                                <div className={"gameoverContainer"}>
                                    <p className={"gameover"}>GAME</p>
                                    <p className={"gameover"}>OVER</p>
                                    { (this.state.stayalive === 4 || this.state.stayalive === 3 || this.state.stayalive === 2) ? 
                                        <button className={"gameButtonGameover"} onClick={() => this.initGame()}>Continue ?</button>
                                    : 
                                        "" }
                                    <button className={"gameButtonGameover rr"} onClick={() => this.restart()}>Play again</button>
                                </div>
                            :
                                ""
                            }
                            <div>
                                <div style={{marginBottom: "30px", display: "flex", flexDirection: "row", justifyContent: "space-between",width: "100px", alignItems: "center",
                                    marginLeft: "15px"
                                }}>
                                    <div className={`pixelized--heart black--${this.state.lifeGameOver}`}/>
                                    <div className={`pixelized--heart black--${this.state.nextLifes}`}/>
                                    <div className={`pixelized--heart black--${this.state.lifes}`}/>
                                </div>
                                <div>
                                    <AudioTetris />
                                </div>
                                <GameOptions className={"gameComponentsscore"} title={"Score"} state={this.state.score}/>
                                <GameOptions className={"gameComponentsline"} title={"Lines"} state={ `${this.state.linesCompletes}/${this.state.lineslevelUp}`}/>
                                <GameOptions className={"gameComponentstime"} title={"Time"} state={this.state.timer}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
	}

}

export default Board;
