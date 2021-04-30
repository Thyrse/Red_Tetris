import React from "react";
import { connect } from 'react-redux'
import { setGridGoingUp, setGameInit, setTetrominoRandom } from "../redux/game/action";

import Grid from "./Grid";

import NextTetromino from "./NextTetromino";
import AudioTetris from "./audioTetris";

import BuildGrid from "../utils/BuildGrid";
import CleanGrids from "../utils/CompletesLines";

import GameOptions from "../components/GameOptions";
import Tetromino from "./tetrominos";
import Start from "./Start";
import Caca from "./caca"

import "../styles/grid.scss";

class Board extends React.Component {
    constructor(props){
        super(props);
      }
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
	audioMute: false,
	firstStart: false,
	gridLevelUp: 1,
    next: 0
    // tetrominoNumber: this.handleRandomTetrominos(),
  };

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

    // this.props.setTetrominoRandom(Caca());

	this.setState(
		{
			gameOver: false,
            // tetrominoNumber: this.handleRandomTetrominos(),
			grid: BuildGrid(this.state.gridHeight, this.state.gridWidth),
            nextPiece: this.generateNextPiece()
		},
		() => {
				this.makeTetromino();
				// this.handleRandomTetrominos();
                // Caca()
				this.launchTimer();
		}
	);
  };

  keyboardUp = (e) => {
	e.preventDefault();
	this.pressedMultipleKey = false;
	let index = this.pressedKey.indexOf(e.key);

	if (index !== -1) {
	  this.pressedKey.splice(index, 1);
	}
  };

  keyboardDown = (e) => {
	e.preventDefault();
	if (this.pressedKey.indexOf(e.key) === -1) {
	  this.pressedKey.push(e.key);
	}

	// we put the key in array so we can
	// press two or more keys at the same time
	if (this.pressedKey.length > 1) {
	  this.pressedKey.forEach((key, index) => {
		if (this.pressedMultipleKey === false && index === 0) {
		  this.pressedMultipleKey = true;
		} else {
		  this.executeKeyCode(key);
		}
	  });
	} else {
	  // one press
	  this.executeKeyCode(this.pressedKey[0]);
	}
  };

  executeKeyCode = (key) => {
	switch (key) {
	  case "ArrowLeft":
		this.pieceMovePosX(-1);
		break;
	  case "ArrowRight":
		this.pieceMovePosX(1);
		break;
	  case "ArrowDown":
		this.pieceMovePosDown(1);
		break;
	  case "ArrowUp":
		this.rotatePiece("right");
		break;
	  case "z":
		this.rotatePiece("right");
		break;
	  case "x":
		this.rotatePiece("left");
		break;
	  default:
		break;
	}
  };

  restart = () => {
	this.setState({
	  linesCompletes: 0,
	  level: 1,
	  score: 0,
	  timer: 0,
	  lifes: 0,
	  nextLifes: 0,
	  lifeGameOver: 0,
	  stayalive: 4,
	});
	this.props.setGridGoingUp(-this.props.gridGoingUp);
	this.initGame();
  };

  gameOver = () => {
	// clearInterval(this.timer);
	// clearInterval(this.gameTimer);

	//set status lost game
	this.setState({ gameOver: true });
	
	this.lifeGameSystem();
	if (this.state.gameOver) {
	  console.log("game-over");
	  window.removeEventListener("keydown", this.keyboardDown);
	  window.removeEventListener("keyup", this.keyboardUp);
	} 
  };

  // level timer
  launchTimer = () => {
	this.timer = setInterval(() => {
	  this.pieceMovePosDown(1);
	}, this.levelUpSpeed());
  };

  levelUpSpeed = () => {
	let interval = this.levelTimeSpeed / this.state.level;
	// console.log("vitesse:" + interval);
	return interval < 100 ? 100 : interval;
  };

//   handleRandomTetrominos() {
//     let newTetromino = [0,1,2,3,4,5,6];
//     var tetrominosValues = newTetromino.length, temp, index;

//     while (tetrominosValues > 0) {
//         index = Math.floor(Math.random() * tetrominosValues);
//         tetrominosValues--;
//         temp = newTetromino[tetrominosValues];
//         newTetromino[tetrominosValues] = newTetromino[index];
//         newTetromino[index] = temp;
//     }

//     // console.log("newTetromino1", newTetromino)
//     // return this.setState({tetrominoNumber: newTetromino});


//     // console.log("TETEs", this.state.tetrominoNumber)
//     return newTetromino;
//   }

  generateNextPiece() {
        let array = [...this.props.tetrominoRandom];
        // console.log("1---> ", this.props.tetrominoRandom);

        let thiw = array[this.state.next]
        
        // if (array.length > this.state.next) 
            this.setState({next: this.state.next + 1})
            console.log("JOJO", thiw);
            // 
            // Caca().map((b) => array.push(b))
        Caca().map((b) => array.push(b))
        this.props.setTetrominoRandom(array);

        // setInterval(() => {
        //     this.props.tetrominoRandom
        //         // this.props.setTetrominoRandom(array.shift());
        //     }, 10000);

        console.log("gg", this.props.tetrominoRandom)
        // console.log(...this.props.tetrominoRandom)
        // console.log(array)
        return thiw;
  }

  makeTetromino = () => {
	let tetromino = {};
	let indexTetromino = this.state.nextPiece;

	tetromino.posY = 0;
	tetromino.color = indexTetromino + 1;
	tetromino.grid = Tetromino[indexTetromino];

	// value 0 cordinate = 0 offset y to -1 init spwn
	if (tetromino.grid[0][0] === 0) {
	    tetromino.posY-- ;
	}

    // console.log("ACA", Tetromino)
	// premier piece x center piece
	tetromino.posX = Math.floor(
	  (this.state.gridWidth - tetromino.grid[0].length) / 2
	);
	tetromino.mergeData = [];

	let resultCordinate = this.tetrominoIsPosition(tetromino);
	// console.log(resultCordinate);
	if (resultCordinate !== false) {
	  tetromino.mergeData = resultCordinate;
	  this.setState({
		tetromino,
		nextPiece: this.generateNextPiece(),
	  }
	  );
	} else {
	  clearInterval(this.timer);
	  clearInterval(this.gameTimer);
	  this.gameOver();
	}
  };

  mergeTetrominoToGrid = () => {
	const piece = this.state.tetromino;
	const gridState = this.state.grid;
	let gridLevelUp = this.props.gridLevelUp;
	let score = this.state.score;
	let level = this.state.level;
	let levelChanged = false;
	let linesCompletes = this.state.linesCompletes; // level score for lines completes

	// color data grid
	piece.mergeData.forEach((element) => {
	  const [y, x] = element.split("_");
	  gridState[y][x] = this.state.tetromino.color;
	});

	let { cleanGrid, numberLinesReady } = CleanGrids(
	  gridState,
	  this.state.gridHeight,
	  this.state.gridWidth
	);
	linesCompletes += numberLinesReady;

	// new level reset interval
	if (numberLinesReady > 0) {
	  score += numberLinesReady * numberLinesReady * 10;
	  if (linesCompletes > this.state.lineslevelUp) {
		linesCompletes = 0;
		level++;
		levelChanged = true;
		clearInterval(this.timer);
	  }
	  if (numberLinesReady > 1) {
		this.props.setGridGoingUp(numberLinesReady - 1)
	  } 
	}

	this.setState(
	  { grid: cleanGrid, piece: null, linesCompletes, level, score },
	  () => {
		this.makeTetromino();
		if (levelChanged) {
		  this.launchTimer();
		}
	  }
	);
  };

  // terminado
  tetrominoIsPosition = (tetromino) => {
	const gridGoingUp = this.props.gridGoingUp;
	const linesCompletes = this.state.linesCompletes;

	// console.log("das", linesCompletes - 1);

	let cordinate = [];
	let y = 0;

	if (this.props.startGame === true) {
		while (y < tetromino.grid.length) {
			// console.log("YYY", y);
			let x = 0;
			while (x < tetromino.grid[0].length) {
			  // console.log("XXX", x)
			  if (tetromino.grid[y][x] > 0) {
				// console.log(grid[y])
				// console.log(this.state.grid[y + tetromino.posY][x + tetromino.posX])
				if (this.state.grid[y + tetromino.posY] === undefined) {
				  return false;
				}
				if (this.state.grid[(y + gridGoingUp) + tetromino.posY] === undefined) {
				  return false;
				}
				if (
				  this.state.grid[y + tetromino.posY][x + tetromino.posX] ===
				  undefined
				) {
				  return false;
				}
				if (this.state.grid[y + tetromino.posY][x + tetromino.posX] > 0) {
				  return false;
				}
				cordinate.push(y + tetromino.posY + "_" + (x + tetromino.posX));
			  }
			  x++;
			}
			y++;
		  }
	}
	
	return cordinate;
  };

  pieceMovePosX = (moveX) => {
	let tetromino = { ...this.state.tetromino };

	if (tetromino === null) {
	  return false;
	}

	tetromino.posX += moveX;

	let resultCordinate = this.tetrominoIsPosition(tetromino);

	if (resultCordinate !== false) {
	  tetromino.mergeData = resultCordinate;
	  this.setState({ tetromino });
	  // console.log(resultCordinate)
	}
	// console.log(tetromino);
  };

  pieceMovePosDown = (moveDown) => {
	let tetromino = { ...this.state.tetromino };

	if (tetromino === null) {
	  return false;
	}

	tetromino.posY += moveDown;

	let resultCordinate = this.tetrominoIsPosition(tetromino);

	if (resultCordinate !== false) {
		if (this.props.startGame === true) {
			tetromino.mergeData = resultCordinate;
			this.setState({ tetromino });
		}
	} else {
	  this.mergeTetrominoToGrid();
	}
  };

  rotatePiece = (rotation) => {
	let tetromino = { ...this.state.tetromino };
	if (tetromino === null) {
	  return false;
	}

	let newGrid = [];
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
	} else if (rotation === "left") {
	  let x = 0;
	  while (x < tetromino.grid[0].length) {
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
	  this.setState({ tetromino });
	} else {
	  let isPositionUpdate = false;

	  // without rotation wall grid
	  if (tetromino.posX < 0) {
		tetromino.posX = 0;
		isPositionUpdate = true;
	  } else if (
		tetromino.grid[0].length + tetromino.posX >
		this.state.gridWidth
	  ) {
		tetromino.posX = this.state.gridWidth - tetromino.grid[0].length;
		isPositionUpdate = true;
	  } else if (tetromino.posY < 0) {
		tetromino.posY = 0;
		isPositionUpdate = true;
	  }

	  if (isPositionUpdate) {
		resultCordinate = this.tetrominoIsPosition(tetromino);
		if (resultCordinate !== false) {
		  tetromino.mergeData = resultCordinate;
		  this.setState({ tetromino });
		}
	  }
	}
  };

  handleGameTime = () => {
    console.log("coucou in");

	//   if (this.props.startGame) {
          console.log("coucou", this.props.startGame);
		this.gameTimer = setInterval(() => {
		this.setState({ timer: this.state.timer + 1 });
		}, 1000);
	// }
  }

  lifeGameSystem() {
    window.removeEventListener("keydown", this.keyboardDown);
    window.removeEventListener("keyup", this.keyboardUp);
	// console.log("this.state.stayalive" + this.state.stayalive)
	this.setState({ stayalive: this.state.stayalive - 1 });

	if (this.state.stayalive === 4) {
	  this.setState({
		lifes: 1,
	  });
	} else if (this.state.stayalive === 3) {
	  this.setState({
		nextLifes: 1,
	  });
	} else if (this.state.stayalive === 2) {
	  this.setState({
		lifeGameOver: 1,
	  });
	}
  }

  firstStart() {
	  this.props.setGameInit(true);
      this.handleGameTime();
	//   console.log(this.state.firstStart)
	//   this.initGame()
  }

  render() {
	return (
	  <>
		<div className="game__pan p-3">
		  {this.state.grid !== null && (
			<Grid
			  grid={this.state.grid}
			  tetromino={this.state.tetromino}
			  gameover={this.state.gameOver}
			/>
		  )}
		  <div className="game-stats">
				<div className="game-stats">
					<div className="game-stats__next p-2">
						<div>
							<p>Coming next</p>
						</div>
						{this.state.nextPiece !== null && (
							<NextTetromino
								grid={Tetromino[this.state.nextPiece]}
								color={this.state.nextPiece + 1}
							/>
						)}
					</div>
					<div className="game-stats__infos p-3">
						<AudioTetris />
						{/* <p style={{color: "white"}}>{this.props.gridGoingUp}</p> */}
						<div className="stats-hearts">
							<div
							className={`pixelized--heart black--${this.state.lifeGameOver}`}
							/>
							<div
							className={`pixelized--heart black--${this.state.nextLifes}`}
							/>
							<div
							className={`pixelized--heart black--${this.state.lifes}`}
							/>
						</div>
						<div className="stats-audit">
							<GameOptions
							className={"stats-audit__level"}
							title={"Level"}
							state={this.state.level}
							/>
							<GameOptions
							className={"stats-audit__score"}
							title={"Score"}
							state={this.state.score}
							/>
							<GameOptions
							className={"stats-audit__lines"}
							title={"Lines"}
							state={`${this.state.linesCompletes}/${this.state.lineslevelUp}`}
							/>
							<GameOptions
							className={"stats-audit__timer"}
							title={"Timer"}
							state={this.state.timer}
							/>
						</div>
					</div>
					{ !this.props.startGame 
					?
						<div>
							<button
								className="btn btn-retro m-2"
								onClick={() => this.firstStart() }
								>START GAME
							</button>
						</div>
					: 
						""}
					{this.state.gameOver ? (
					<div className="game-stats__replay">
						{this.state.stayalive === 4 ||
						this.state.stayalive === 3 ||
						this.state.stayalive === 2 ? (
						<button
							className="btn btn-retro m-2"
							onClick={() => this.initGame()}
						>
							Continue
						</button>
						) : (
						""
						)}
						<button
						className="btn btn-retro m-2"
						onClick={() => this.restart()}
						>
						Play again
						</button>
					</div>
					) : (
					""
					)}
				</div>
			</div>
		</div>
	  </>
	);
  }
}

const mapStateToProps = (state) => {
	return {
		gridGoingUp: state.startGame.gridGoingUp,
		startGame: state.startGame.startGame,
        tetrominoRandom: state.startGame.tetrominoRandom
	}
	// gridGoingUp: state.gridGoingUp
};

const mapDispatchToProps = (dispatch) => {
	// console.log("HJOLAS" + dispatch)
	// dispatch(setGridGoingUp({gridGoingUp: 10}));
	// return {
	//     setGridGoingUp
	// }
	return {
		setGridGoingUp: (gridUp) => dispatch(setGridGoingUp(gridUp)),
		setGameInit: (gameFirst) => dispatch(setGameInit(gameFirst)),
        setTetrominoRandom: (random) => dispatch(setTetrominoRandom(random))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Board);

// export default Board;