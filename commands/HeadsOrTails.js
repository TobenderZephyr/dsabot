const globals = require('../globals');
const Random = require('random');


module.exports = {
	name: 'kopf',
	description: 'Wirf eine Münze. Kopf oder Zahl?',
	aliases: ['zahl', 'heads', 'tails'],
	usage: '',
	needs_args: false,

	async exec(message, args) {
		Random.use(message.author.tag);
		const coin = Random.int(0, 1);
		message.reply('Die Münze bleibt auf **' + globals.Coin[coin] + '** liegen.');
	},
};