import React from "react";
import { useSelector } from "react-redux";
// import { setGridGoingUp } from "../redux/game/action";

// REACT ROUTER
import MirrorTetromino from "../utils/MirrorTetromino";

const Grid = ({ grid, tetromino, gameover, winner }) => {
  let mirrorTetromino = [];
  const gridGoingUp = useSelector((state) => state.startGame.gridGoingUp);
  const gameReady = useSelector((state) => state.startGame.startGame);

  if (tetromino) {
    mirrorTetromino = MirrorTetromino(grid, tetromino, gridGoingUp, gameReady);
  }

  return (
    <div className="game-table">
      {gameover && (
        <div className="game-table__over">
          <p>GAME OVER</p>
        </div>
      )}
      {winner && (
        <div className="game-table__win">
          <p>YOU WIN!</p>
        </div>
      )}
      {grid.map((line, y) => {
        return line.map((col, x) => {
          let tetrominosSetting = [];

          //   console.log("--->" + grid)
          if (x === 0) {
            // tetrominosSetting.push("first");
          }
          if (gameover) {
            tetrominosSetting.push("finish");
          }

          if (y === 0) {
            tetrominosSetting.push("colory");
          }

          if (tetromino !== null) {
            if (tetromino.mergeData.indexOf(y + "_" + x) !== -1) {
              tetrominosSetting.push("color" + tetromino.color);
            }
          }

          // aca el mirror gridlevelup CASI
          if (mirrorTetromino.indexOf(y + "_" + x) !== -1) {
            tetrominosSetting.push("mirror");
          }

          if (grid[y][x] > 0) {
            tetrominosSetting.push("color" + grid[y][x]); //jugar invisible
          }

          if (y >= grid.length - gridGoingUp) {
            tetrominosSetting.push("gridUp");
          }

          if (grid[y]) {
            tetrominosSetting.push("back");
          }

          return (
            <div
              key={x + "_" + y}
              className={"game-table__cell " + tetrominosSetting.join(" ")}
            ></div>
          );
        });
      })}
    </div>
  );
};

export default Grid;
