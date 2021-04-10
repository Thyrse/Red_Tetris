import React from "react";
import "../styles/tetris.css";

function NextTetromino({ grid }) {
  return (
    <div className="game-stats__block">
      {
        // grid ?
        // console.log("acato==> " + grid)
        grid.map((line, y) => {
          return line.map((col, x) => {
            let tetrominosSetting = [];
            if (grid[y][x] > 0) {
              tetrominosSetting.push("piece_next");
              // value = grid[y][x]
            }

            return (
              <div
                key={x + "_" + y}
                className={"next-cell " + tetrominosSetting.join(" ")}
              >
                {/* { value } */}
              </div>
            );
          });
        })
        // :
        //     <span>Loading...</span>
      }
    </div>
  );
}

export default NextTetromino;
