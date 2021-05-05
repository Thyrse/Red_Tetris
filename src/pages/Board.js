import React from "react";
import { connect } from "react-redux";
import {
  setGridGoingUp,
  setGameInit,
  setTetrominoRandom,
} from "../redux/game/action";

import Grid from "./Grid";
import GridMirror from "./gridMirror";

import NextTetromino from "./NextTetromino";
import AudioTetris from "./audioTetris";

import BuildGrid from "../utils/BuildGrid";
import CleanGrids from "../utils/CompletesLines";
import RandomTetrominos from "../utils/RandomTetrominos";

import GameOptions from "../components/GameOptions";
import Tetromino from "./tetrominos";
import Start from "./Start";
import { useDispatch, useSelector } from "react-redux";

import { setRooms } from "../redux/rooms/reducers";

class Board extends React.Component {
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
    winner: false,
    firstStart: false,
    gridLevelUp: 1,
    ownered: null,
    currentPieces: this.props.rooms[
      this.props.rooms.findIndex((room) => room.id === this.props.user.room)
    ].pieces,
    next: 0,
  };

  componentDidMount() {
    this.initGame();
  }

  componentWillUnmount() {
    clearInterval(this.newPieces);
    this.props.setGameInit(false);
    window.removeEventListener("keydown", this.keyboardDown);
    window.removeEventListener("keyup", this.keyboardUp);
    this.setState({ ownered: null });
  }

  initGame = () => {
    console.log = console.warn = console.error = () => {};
    this.socketSetting();

    // put in options
    this.levelTimeSpeed = 1500;

    this.pressedKey = [];
    this.pressedMultipleKey = false;

    window.addEventListener("keyup", this.keyboardUp);
    window.addEventListener("keydown", this.keyboardDown);

    this.setState(
      {
        gameOver: false,
        grid: BuildGrid(this.state.gridHeight, this.state.gridWidth),
        nextPiece: this.generateNextPiece(),
      },
      () => {
        this.makeTetromino();
        this.launchTimer();
        // if (this.props.startGame) {
        //   this.handleGameTime();
        // }
      }
    );
  };

  keyboardUp = (e) => {
    if (
      ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].indexOf(e.key) > -1 ||
      e.target === document.body
    ) {
      e.preventDefault();
    }
    this.pressedMultipleKey = false;
    let index = this.pressedKey.indexOf(e.key);

    if (index !== -1) {
      this.pressedKey.splice(index, 1);
    }
  };

  keyboardDown = (e) => {
    if (
      ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].indexOf(e.key) > -1 ||
      e.target === document.body
    ) {
      e.preventDefault();
    }
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
      case " ":
        this.rotatePiece("left");
        break;
      default:
        break;
    }
  };

  socketSetting() {
    // const userRoom = this.props.rooms[this.state.ownered].owner;
    const findOwner = this.props.rooms.findIndex(
      (room) => room.id === this.props.user.room
    );

    this.setState({
      ownered: findOwner,
      currentPieces: this.props.rooms[findOwner].pieces,
    });

    this.props.socket.on("GAME_WINNER", () => {
      this.gameWin();
    });

    this.newPieces = setInterval(() => {
      if (
        this.props.rooms[this.state.ownered].owner === this.props.user.socketID
      ) {
        this.props.socket.emit("NEW_PIECES", {
          room: this.props.user.room,
          pieces: RandomTetrominos(),
        });
      }
    }, 3000);

    this.props.socket.on("UPDATE_PIECES", (data) => {
      this.props.setRooms(data);
      this.setState({
        currentPieces: this.props.rooms[findOwner].pieces,
      });
    });

    this.props.socket.on("RECEIVE_MIRROR", (data) => {
      this.props.setRooms(data);
    });

    this.props.socket.on("BEGIN_GAME", () => {
      this.props.setGameInit(true);
      this.handleGameTime();
    });

    this.props.socket.on("RECEIVE_PENALTY", (data) => {
      if (data.user !== this.props.user.socketID) {
        this.props.setGridGoingUp(data.penalty);
      }
    });
  }

  gridTetrominoMirror = () => {
    this.props.socket.emit("SEND_MIRROR", {
      user: this.props.user,
      mirror: this.state.grid,
    });
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
    this.handleGameTime();
  };

  gameWin = () => {
    this.setState({ winner: true });
    window.removeEventListener("keydown", this.keyboardDown);
    window.removeEventListener("keyup", this.keyboardUp);
    clearInterval(this.gameTimer);
    clearInterval(this.timer);
  };

  gameOver = () => {
    clearInterval(this.timer);
    clearInterval(this.gameTimer);

    //set status lost game
    this.setState({
      gameOver: true,
    });
    this.lifeGameSystem();
    if (this.state.gameOver) {
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
    return interval < 100 ? 100 : interval;
  };

  generateNextPiece() {
    let array = [...this.state.currentPieces];
    let thiw = array[this.state.next];
    this.setState({ next: this.state.next + 1 });
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
      tetromino.posY--;
    }

    // premier piece x center piece
    tetromino.posX = Math.floor(
      (this.state.gridWidth - tetromino.grid[0].length) / 2
    );
    tetromino.mergeData = [];

    let resultCordinate = this.tetrominoIsPosition(tetromino);
    if (resultCordinate !== false) {
      tetromino.mergeData = resultCordinate;
      this.setState({
        tetromino,
        nextPiece: this.generateNextPiece(),
      });
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
        this.props.socket.emit("SEND_PENALTY", {
          penalty: numberLinesReady - 1,
          user: this.props.user,
        });
        // this.props.setGridGoingUp(numberLinesReady - 1);
      }
    }

    this.gridTetrominoMirror();

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
    let cordinate = [];
    let y = 0;

    if (this.props.startGame === true) {
      while (y < tetromino.grid.length) {
        let x = 0;
        while (x < tetromino.grid[0].length) {
          if (tetromino.grid[y][x] > 0) {
            if (this.state.grid[y + tetromino.posY] === undefined) {
              return false;
            }
            if (
              this.state.grid[y + gridGoingUp + tetromino.posY] === undefined
            ) {
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
    }
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
      let x = tetromino.grid[0].length - 1;
      while (x > -1) {
        let line = [];
        let y = 0;
        while (y < tetromino.grid.length) {
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
    this.gameTimer = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 1000);
  };

  lifeGameSystem() {
    window.removeEventListener("keydown", this.keyboardDown);
    window.removeEventListener("keyup", this.keyboardUp);
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
      clearInterval(this.newPieces);
    }
  }

  continueGame() {
    this.initGame();
    this.handleGameTime();
  }

  firstStart() {
    this.props.socket.emit("START_GAME", this.props.user);
    this.props.setGameInit(true);
  }
  render() {
    return (
      <>
        <div className="game__pan p-3">
          {this.props?.rooms[
            this.props.rooms?.findIndex(
              (room) => room.id === this.props.user?.room
            )
          ].type === "2" && (
            <div className="game-mirrors shadow">
              {this.props?.rooms[
                this.props.rooms?.findIndex(
                  (room) => room.id === this.props.user?.room
                )
              ].mirror.map(
                (currentMirror) =>
                  currentMirror.id !== this.props.user?.socketID && (
                    <div className="d-flex flex-column text-center m-2">
                      <span>{currentMirror.username}</span>
                      <GridMirror grid={currentMirror.grid} />
                    </div>
                  )
              )}
            </div>
          )}
          {this.state.grid !== null && (
            <Grid
              grid={this.state.grid}
              tetromino={this.state.tetromino}
              gameover={this.state.gameOver}
              winner={this.state.winner}
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
                {/* <AudioTetris /> */}
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
                  <AudioTetris />
                </div>
              </div>
              {this.state.ownered !== null &&
              this.props.rooms[this.state.ownered].owner ===
                this.props.user.socketID &&
              !this.props.startGame ? (
                <div>
                  <button
                    className="btn btn-retro m-2"
                    onClick={() => this.firstStart()}
                  >
                    START GAME
                  </button>
                </div>
              ) : (
                ""
              )}
              {this.state.gameOver ? (
                <div className="game-stats__replay">
                  {this.state.stayalive === 4 ||
                  this.state.stayalive === 3 ||
                  this.state.stayalive === 2 ? (
                    <button
                      className="btn btn-retro m-2"
                      onClick={() => this.continueGame()}
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
    tetrominoRandom: state.startGame.tetrominoRandom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGridGoingUp: (gridUp) => dispatch(setGridGoingUp(gridUp)),
    setGameInit: (gameFirst) => dispatch(setGameInit(gameFirst)),
    setTetrominoRandom: (random) => dispatch(setTetrominoRandom(random)),
    setRooms: (data) => dispatch(setRooms(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
