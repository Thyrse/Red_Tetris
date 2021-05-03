import React from "react";
import { useSelector } from "react-redux";

import "../styles/gridMirror.scss";

const GridMirror = ({ grid }) => {
  const gridGoingUp = useSelector((state) => state.startGame.gridGoingUp);

  console.log("ACAS", grid)
  return (
    <div id="grid" className="grid">
      {grid.map((line, y) => {
        return line.map((col, x) => {
          let tetrominosSetting = [];

          //   console.log("---" + grid)
          if (x === 0) {
            tetrominosSetting.push("firstMirror");
          }

          if (grid[y][x] > 0) {
            tetrominosSetting.push("colorMirror");
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
