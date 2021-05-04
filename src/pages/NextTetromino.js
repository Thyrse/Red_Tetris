import React from "react";

function NextTetromino({ grid, color }) {
  return (
    <div className="tetromino-wrapper tetrominoWrapper">
      <div id="tetrominoContainer" className="tetromino-preview">
        {grid.map((line, y) => {
          return line.map((col, x) => {
            let tetrominosSetting = [];

            if (x === 0) {
              tetrominosSetting.push("first");
            }
            if (grid[y][x] > 0) {
              tetrominosSetting.push("color" + color);
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
    </div>
  );
}

export default NextTetromino;
