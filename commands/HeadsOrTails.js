const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');
const { Coin } = require('../globals');

module.exports = {
    name: 'kopf',
    description: 'Wirf eine Münze. Kopf oder Zahl?',
    aliases: ['zahl', 'heads', 'tails'],
    usage: '',
    needs_args: false,

    async exec(message) {
        const { dice } = roll(1, 2, message.author.tag);
        message.reply(`${findMessage('HEADS_OR_TAILS')} **${Coin[dice - 1]}**.`);
    },
};
