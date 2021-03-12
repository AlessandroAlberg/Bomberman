function getRandom(max) {
    const random = Math.floor(Math.random() * max + 1);
    return random;
}

function getArrayRandom(number, random) {
    let arrayOfNumber = new Array;
    for(var i = 0; i < number; i++) {
        arrayOfNumber[i] = getRandom(random);
    }
    return arrayOfNumber;
}

module.exports = {
    getRandom,
    getArrayRandom
}