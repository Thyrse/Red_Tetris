import React from "react";
import { useSelector } from "react-redux";

const GridMirror = ({ grid, gridMirror }) => {
  const gridGoingUp = useSelector((state) => state.startGame.gridGoingUp);

  //   console.log("grid", grid)
  //   console.log("mirror", gridMirror)

  return (
    <div id="grid" className="grid-mirror">
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

          return (
            <div
              key={x + "_" + y}
              className={`grid-mirror-cell ` + tetrominosSetting.join(" ")}
            ></div>
          );
        });
      })}
    </div>
  );
};

export default GridMirror;
