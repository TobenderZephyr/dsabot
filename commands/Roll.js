// eslint-disable-next-line no-unused-vars

const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');
const { DiceRegex } = require('../globals');

module.exports = {
    name: 'roll',
    description:
        'Lass die Würfel rollen. Benötigt wird die Anzahl sowie die Augenzahl auf den Würfeln.',
    aliases: ['r'],
    usage: '<Anzahl> w <Augenzahl>',
    needs_args: true,
    async exec(message, args) {
        const params = args.join('').split(DiceRegex);
        if (params.length >= 2) {
            const Bonus = parseInt(params[2], 10) || 0;
            const numberOfDice = parseInt(params[0], 10);
            const diceValues = parseInt(params[1], 10);
            const result = roll(numberOfDice, diceValues, message.author.tag);
            const total = Bonus ? Bonus + result.sum : result.sum;
            message.reply(
                `${findMessage('ROLL')} ${result.dice.join(', ')} ` +
                    `(Gesamt: ${result.sum}${Bonus ? `+${Bonus}=${total}` : ``})`
            );
        }
    },
};
