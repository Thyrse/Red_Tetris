import React, { useState } from "react";

const initGame = (grid, nextPiece) => {
    this.setState({
        grid: this.buildGrid(),
        nextPiece: this.generateNextPieceIndex()
    }, () => {
        this.makeTetromino()
        
        this.launchTimer()
    })
}

export default initGame;