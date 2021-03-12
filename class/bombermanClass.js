var cron = require('node-cron');

module.exports = class Bomberman{
    constructor(lines, columns, seconds){
        this.lines = lines; 
        this.columns = columns;
        this.seconds = seconds;
        this.verification = 0;
    }

    async start(grid){
        var firstArrayOfLines = await new Array();
        var firstArrayOfColumns = await new Array();
        var arrayOfLines = await new Array();
        var arrayOfColumns = await new Array();
        
        await this.#showGrid(grid);

        const firstMoment = '*/' + this.seconds + ' * * * * *';
        const secondMoment = '*/' + this.seconds * 2 + ' * * * * *';
        
        cron.schedule(firstMoment, () => {
            this.#firstMoment(grid, firstArrayOfColumns, firstArrayOfLines, arrayOfColumns, arrayOfLines);
        });

        cron.schedule(secondMoment, () => {
            this.#secondMoment(grid, firstArrayOfColumns, firstArrayOfLines, arrayOfColumns, arrayOfLines);
            firstArrayOfLines = [];
            firstArrayOfColumns = [];
            arrayOfLines = [];
            arrayOfColumns = [];
        });
        
    }

    async #firstMoment(grid, firstArrayOfColumns, firstArrayOfLines, arrayOfColumns, arrayOfLines) {
        await this.#findBombs(grid, firstArrayOfColumns, firstArrayOfLines);
        await this.#allBomb(grid, arrayOfColumns, arrayOfLines);
        if((this.verification %= 2) == 0) {
            await this.#showGrid(grid);
        }
        this.verification++;
    }
    
    async #secondMoment(grid, firstArrayOfColumns, firstArrayOfLines) {
        if (firstArrayOfLines.length != 0) {
            for(var i = 0; i < firstArrayOfLines.length; i++){
                await this.#detonateBomb(grid, firstArrayOfColumns[i], firstArrayOfLines[i]);
            }
            await this.#showGrid(grid);
        }
    }

    async #findBombs(grid, arrayOfColumns, arrayOfLines) {
        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.lines; j++) {
                if ( grid[i][j] === "O" ){
                    await arrayOfColumns.push(i);
                    await arrayOfLines.push(j);
                }
            }
        }
    }

    async #allBomb(grid, arrayOfColumns, arrayOfLines) {
        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.lines; j++) {
                if ( grid[i][j] === "." ){
                    grid[i][j] = "O";
                    await arrayOfColumns.push(i);
                    await arrayOfLines.push(j);
                }
            }
        }
    }

    async #detonateBomb(grid, column, line) {
        grid[column][line] = ".";

        for (var i = column - 1; i >= 0; i--) {
            if (grid[i][line] != 'X') {
                grid[i][line] = "."
            } else {
                break;
            }
        }

        for (var i = column + 1; i < this.columns; i++) {
            if (grid[i][line] != 'X') {
                grid[i][line] = "."
            } else {
                break;
            }
        }

        for (var j = line - 1; j >= 0; j--) {
            if (grid[column][j] != 'X') {
                grid[column][j] = "."
            } else {
                break;
            }
        }

        for (var j = line + 1; j < this.lines; j++) {
            if (grid[column][j] != 'X') {
                grid[column][j] = "."
            } else {
                break;
            }
        }

    }

    async #showGrid(grid) {
        var line = "";
        await console.log("\n");
        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.lines; j++) {
                line = line + "   " + grid[i][j];
            }
            await console.log(line + "\n");
            line = "";
        }
    }
}