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
		let arguments = args.join('').split(globals.DiceRegex);
		if (arguments.length >= 2) {
			let bonus = 0;
			const numberOfDice = parseInt(arguments[0]);
			const diceValues = parseInt(arguments[1]);
			if (arguments.length==3)  { bonus = parseInt(arguments[2]); }
			let sum = bonus;
			const roll = [];
			for (let i = 0; i < numberOfDice; i++) {
				const a = Random.int(1, diceValues);
				roll.push(a);
				sum += a;
			}
			if (numberOfDice == 1) {
				msg = 'n';
			}
			else {
				msg = ' ' + numberOfDice;
			}
			//message.reply('Das sind deine Ergebnisse für deine' + msg + ' ' + diceValues + '-seitigen 🎲: ' + roll.join(', ') + '. (Gesamt: ' + roll.reduce((pv, cv) => pv + cv, 0) + ' + ' + bonus[1] + ' = ' + sum + ')');
			message.reply(`Das sind die Ergebnisse für deine${msg} ${diceValues}-seitigen 🎲: ${roll.join(', ')}. (Gesamt: ${roll.reduce((pv, cv) => pv + cv, 0)} + ${bonus} = ${sum})`);
		}
	},
};