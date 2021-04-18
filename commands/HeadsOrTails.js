const globals = require('../globals');
const { roll } = require('@dsabot/Roll');
const { findMessage }= require('@dsabot/findMessage');

module.exports = {
	name: 'kopf',
	description: 'Wirf eine Münze. Kopf oder Zahl?',
	aliases: ['zahl', 'heads', 'tails'],
	usage: '',
	needs_args: false,

	async exec(message, args) {
		const coin = roll(1,2,message.author.tag).dice;
		message.reply(`${findMessage('HEADS_OR_TAILS')} **${globals.Coin[(coin-1)]}**.`);
	},
};