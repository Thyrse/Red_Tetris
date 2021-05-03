import React from "react";
import { useSelector } from "react-redux";
// import { setGridGoingUp } from "../redux/game/action";

// REACT ROUTER
import MirrorTetromino from "../utils/MirrorTetromino";
import "../styles/gridMirror.scss";

const GridMirror = ({ grid, tetromino, gameover, winner }) => {
//   let mirrorTetromino = [];
  const gridGoingUp = useSelector((state) => state.startGame.gridGoingUp);
  const gameReady = useSelector((state) => state.startGame.startGame);

//   if (tetromino) {
    // mirrorTetromino = MirrorTetromino(grid, tetromino, gridGoingUp, gameReady);
//   }

  return (
    <div id="grid" className="grid">
      {grid.map((line, y) => {
        return line.map((col, x) => {
          let tetrominosSetting = [];

          //   console.log("--->" + grid)
          if (x === 0) {
            tetrominosSetting.push("firstMirror");
          }

        //   if (gameover) {
        //     tetrominosSetting.push("finish");
        //   }

          if (grid[y][x] > 0) {
            tetrominosSetting.push("colorMirror"); //jugar invisible
          }

          if (y >= grid.length - gridGoingUp) {
            tetrominosSetting.push("gridGoingUp");
          }

          if (grid[y]) {
            tetrominosSetting.push("backMirror");
          }

          return <span key={x + "_" + y} className={tetrominosSetting.join(" ")}></span>
        });
      })}
    </div>
  );
};

export default GridMirror;
