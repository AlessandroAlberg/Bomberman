function dataInput(data) {
    try{
        const arrayOfNumber = formatData(data);
        error(arrayOfNumber);

        return arrayOfNumber;
    } catch (err) {
        throw new Error(err);
    }
}

function formatData(data) {
    try{
        const arrayOfData = data.split(" ");
        const arrayOfNumber = arrayOfData.map((i) => Number(i));
        return arrayOfNumber;
    } catch (err) {
        throw new Error(err);
    }
}

function error(arrayOfNumber) {
    if ( arrayOfNumber[0] < 1 || arrayOfNumber[0] > 200 ) { throw new Error('O número de lines tem que estar entre 1 e 200') }
    if ( arrayOfNumber[1] < 1 || arrayOfNumber[1] > 200 ) { throw new Error('O número de columns tem que estar entre 1 e 200') }
    if ( arrayOfNumber[2] < 1 || arrayOfNumber[2] > 1000000000 ) { throw new Error('O número de segundos tem que estar entre 1 e 10^9') }
}

module.exports = {
    dataInput
};