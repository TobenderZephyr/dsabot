const { Random } = require('@dsabot/Random');
//const Random = require('random');

const roll = (numberOfDice, numberOfEyes, tag) => {
    const dice = [];
    let sum = 0;
    if (tag) {
        Random.use(tag);
    }
    for (let i = 0; i < numberOfDice; i++) {
        const result = Random.int(1, numberOfEyes);
        dice.push(result);
        sum += result;
    }
    return { dice, sum };
};
module.exports = { roll };
