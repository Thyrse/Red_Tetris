const MirrorTetromino = (grid, tetromino, gridGoingUp, gameReady) => {
  let previousCordinate = [];
  let cordinate = [];
  let mirrorY = tetromino.posY;
  if (gameReady === true) {
    while (mirrorY < grid.length) {
      previousCordinate = cordinate;
      cordinate = [];
      let y = 0;
      while (y < tetromino.grid.length) {
        let x = 0;
        while (x < tetromino.grid[0].length) {
          if (tetromino.grid[y][x] > 0) {
            // ACA ESTA EL ULTIMO
            if (grid[y + mirrorY + gridGoingUp] === undefined) {
              return previousCordinate;
            }
            if (grid[y + mirrorY][x + tetromino.posX] > 0) {
              return previousCordinate;
            }

            cordinate.push(y + mirrorY + "_" + (x + tetromino.posX));
          }
          x++;
        }
        y++;
      }
      mirrorY++;
    }
  }
  return cordinate;
};

export default MirrorTetromino;
