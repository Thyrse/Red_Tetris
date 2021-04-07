import React from "react";

const RotateTetromino = (rotation) => {
    let tetromino = { ...this.state.tetromino }

    if (tetromino === null) {
        return false
    }

    let newGrid = []

    if (rotation === "right") {
        for (let x = tetromino.grid[0].length - 1; x > -1; x--) {
            let line = [];
            for (let y = 0; y < tetromino.grid.length; y++) {
                // console.log(y + "_" + x + "  >" + tetromino.grid[y][x]);
                line.push(tetromino.grid[y][x])
            } 
            newGrid.push(line);
        }
    }
    else if (rotation === "left") {
        for (let x = 0; x < tetromino.grid[0].length; x++) {
            let line = [];
            for (let y = tetromino.grid.length - 1; y > -1; y--) {
                // console.log(y + "_" + x + "  >" + tetromino.grid[y][x]);
                line.push(tetromino.grid[y][x])
            } 
            newGrid.push(line);
        }
    }
    tetromino.grid = newGrid;

    let resultCordinate = this.tetrominoIsPosition(tetromino);

    if (resultCordinate !== false) {
        tetromino.mergeData = resultCordinate;
        this.setState({ tetromino })
        // console.log("---> ",resultCordinate)
    } else {
        let isPositionUpdate = false
        // without rotation wall grid
        if (tetromino.posX < 0) {
            tetromino.posX = 0;
            isPositionUpdate = true;
        } else if (tetromino.grid[0].length + tetromino.posX  > this.state.gridWidth) {
            tetromino.posX = this.state.gridWidth - tetromino.grid[0].length
            isPositionUpdate = true
        } else if (tetromino.posY < 0) {
            tetromino.posY = 0
            isPositionUpdate = true
        }

        if (isPositionUpdate) { 
            resultCordinate = this.tetrominoIsPosition(tetromino)
            if (resultCordinate !== false) {
                tetromino.mergeData = resultCordinate
                this.setState({ tetromino })
            }
        }
            // resultCordinate = this.tetrominoIsPosition(tetromino);
        //     if (resultCordinate !== false) {
        //         tetromino.mergeData = resultCordinate;
        //         this.setState({ tetromino });
        //         // console.log("---> ",resultCordinate)
        //     } 
        // } else if (tetromino.grid[0].length + this.state.gridWidth > this.state.gridWidth) {
        //     tetromino.posX = this.state.gridWidth - tetromino.grid[0].length;
        //     resultCordinate = this.tetrominoIsPosition(tetromino);
        //     if (resultCordinate !== false) {
        //         tetromino.mergeData = resultCordinate;
        //         this.setState({ tetromino });
        //     }
        // } else if () {
        //     tetromino.grid.length + 
        // }

    }
}

export default RotateTetromino;