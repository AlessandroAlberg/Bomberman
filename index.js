const readlineSync = require('readline-sync');
const { dataInput } = require('./functions/dataFunction');
const Grid = require('./class/gridClass');
const Bomberman = require('./class/bombermanClass');

async function start() {
    const data = await readlineSync.question("Digite os valores em inteiro do numero de linhas(R), colunas(C) e os segundos(N) separados por um espaco: ");

    const arrayOfData = await dataInput(data);

    const grid = await new Grid(arrayOfData[1], arrayOfData[0]);
    const matrix = await grid.matrix;

    const bomberman = await new Bomberman(arrayOfData[1], arrayOfData[0], arrayOfData[2]);
    await bomberman.start(matrix);
}

start();