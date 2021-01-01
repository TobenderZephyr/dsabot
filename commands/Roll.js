// eslint-disable-next-line no-unused-vars
const globals = require('../globals');
const Random = require('random');


module.exports = {
	name: 'roll',
	description: 'Lass die Würfel rollen. Benötigt wird die Anzahl sowie die Augenzahl auf den Würfeln.',
	aliases: ['r'],
	usage: '<Anzahl> w <Augenzahl>',
	needs_args: true,
	async exec(message, args) {

		Random.use(message.author.tag);
		let msg;
		let arguments = args.join('');
		arguments = arguments.split(globals.DiceRegex);
		if (arguments.length == 2) {
			const numberOfDice = parseInt(arguments[0]);
			const diceValues = parseInt(arguments[1]);
			console.log(diceValues)
			const roll = [];
			for (let i = 0; i < numberOfDice; i++) {
				const a = Random.int(1, diceValues);
				roll.push(a);
			}
			if (numberOfDice == 1) {
				msg = 'n';
			}
			else {
				msg = ' ' + numberOfDice;
			}
			message.reply('Das sind deine Ergebnisse für deine' + msg + ' ' + diceValues + '-seitigen 🎲: ' + roll.join(', ') + '.');
		}
	},
};