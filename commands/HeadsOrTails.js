const globals = require('../globals');
//const Random = require('random');
const { roll } = require('@dsabot/Roll');
const { findMessage }= require('@dsabot/findMessage');

module.exports = {
	name: 'kopf',
	description: 'Wirf eine Münze. Kopf oder Zahl?',
	aliases: ['zahl', 'heads', 'tails'],
	usage: '',
	needs_args: false,

	async exec(message, args) {
		//Random.use(message.author.tag);
		const coin = roll(1,2,message.author.tag).dice; //Random.int(0, 1);
//		message.reply('Die Münze bleibt auf **' + globals.Coin[coin] + '** liegen.');
		message.reply(`${findMessage('HEADS_OR_TAILS')} **${globals.Coin[(coin-1)]}**.`);
	},
};