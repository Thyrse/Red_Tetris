import React, { useState } from "react";

function cleaningLine(grid, width) { 
    let line = []
    let x = 0;

    // console.log("line", line)

    while(x < width) {
        // if (grid.length >= -10) {
        //     line.push(1)
        // } else {
            line.push(0);
        // }
        x++;
    }
    return line;
}

const cleanGrids = (grid, gridHeight, gridWidth) => {
    let cleanGrid = []
    let numberLinesReady = 0
    let y = 0;
    
    while (y < gridHeight) {
        let lineCompleted = true;
        let x = 0;
        while (x < gridWidth) {
            if (grid[y][x] === 0) { 
                lineCompleted = false;
            }
            x++;
        }
        if (lineCompleted === false) {
            // console.log("number", grid[y]);
            cleanGrid.push(grid[y]);
        }      
        y++;  
    }

    numberLinesReady = gridHeight - cleanGrid.length
    let z  = 0;

    while(z < numberLinesReady) {         
        cleanGrid.unshift(cleaningLine(grid, gridWidth))
        z++;
    }


    return { cleanGrid, numberLinesReady }
}

export default cleanGrids;