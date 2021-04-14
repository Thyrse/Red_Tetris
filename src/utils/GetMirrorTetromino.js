function getMirrorTetromino(grid, tetromino) {

    let previousCordinate = [];
    let cordinate = [];

        for (let mirrorY = tetromino.posY; mirrorY < grid.length; mirrorY++) {

            previousCordinate = cordinate;
            cordinate = [];

            for (let y = 0; y < tetromino.grid.length; y++) {
                // console.log("YYY", y)
                for (let x = 0; x < tetromino.grid[0].length; x++) {
                    // console.log("XXX", x)
                    if (tetromino.grid[y][x] > 0) {
                        // console.log(grid[y])
                        // console.log(this.state.grid[y + tetromino.posY][x + tetromino.posX])
                        if (grid[y + mirrorY] === undefined) {
                            return previousCordinate;
                        }
                        
                        
                        if (grid[y + mirrorY][x + tetromino.posX] > 0) {
                            return previousCordinate;
                        }

                        cordinate.push((y + mirrorY) + "_" + (x + tetromino.posX));
                    }
                }
            }
        }
        return cordinate;
}

export default getMirrorTetromino;