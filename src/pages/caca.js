import React from 'react'

const Caca = () => {
        let newTetromino = [0,1,2,3,4,5,6];
        var tetrominosValues = newTetromino.length, temp, index;
    
        while (tetrominosValues > 0) {
            index = Math.floor(Math.random() * tetrominosValues);
            tetrominosValues--;
            temp = newTetromino[tetrominosValues];
            newTetromino[tetrominosValues] = newTetromino[index];
            newTetromino[index] = temp;
        }
    
        // console.log("newTetromino1", newTetromino)
        // return this.setState({tetrominoNumber: newTetromino});
    
    
        // console.log("TETEs", this.state.tetrominoNumber)
        return newTetromino;
}

export default Caca
