import React, { useState, useEffect, useContext, useCallback } from "react";
// REACT ROUTER
import GetMirrorTetromino from "../utils/GetMirrorTetromino";
import "../styles/grid.scss";

const Grid = ({ grid, tetromino, gameover, winner }) => {
  let mirrorTetromino = [];
  if (tetromino) {
    mirrorTetromino = GetMirrorTetromino(grid, tetromino);
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

          if (x === 0) {
            tetrominosSetting.push("first");
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

          if (mirrorTetromino.indexOf(y + "_" + x) !== -1) {
            tetrominosSetting.push("mirror");
          }

          if (grid[y][x] > 0) {
            tetrominosSetting.push("color" + grid[y][x]); //jugar invisible
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
