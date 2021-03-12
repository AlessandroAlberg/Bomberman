const { getRandom, getArrayRandom } = require('../utils/utils');

module.exports = class Grid {
    constructor(lines, columns) {
        this.lines = lines; 
        this.columns = columns;
        this.matrix = this.#createGrid();
    }

    async #createGrid() {
        var grid = await new Array(this.columns); 
            for (var i = 0; i < this.columns; i++) {
                grid[i] = await new Array(this.lines);
            }
        
        return this.#manageGrid(grid);
    }

    async #manageGrid(grid) {
        try{
            await this.#fillGrid(grid);
            await this.#fillRandomFields(grid, "X", 3);
            await this.#fillRandomFields(grid, "O", 1);
            return grid;
        } catch (err) {
            throw new Error(err);
        }
    }

    async #fillGrid(grid) {
        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.lines; j++) {
                grid[i][j] = '.';
            }
        }
    }

    async #fillRandomFields(grid, type, numField) {
        const numberFields = await getRandom(this.columns * this.lines);
        const numbersColumns = await getArrayRandom(numberFields/numField, this.columns);
        const numbersLines = await getArrayRandom(numberFields/numField, this.lines);

        for(var i = 0; i < numberFields/3; i++){
            if(numbersColumns[i] < this.columns && numbersLines[i] < this.lines){
                grid[numbersColumns[i]][numbersLines[i]] = type; 
            }
        }
    }
}