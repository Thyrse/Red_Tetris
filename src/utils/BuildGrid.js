const BuildGrid = (gridHeight, gridWidth) => {
    let grid = []
    let y = 0;

    while (y < gridHeight) {
        let line = [];
        let x = 0;

        while (x < gridWidth) {
            line.push(0);
            x++;
        }
        grid.push(line);
        y++;
    }
    return grid;
}

export default BuildGrid;