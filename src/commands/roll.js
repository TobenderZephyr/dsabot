// eslint-disable-next-line no-unused-vars
const globals = require('../globals')
const Random = require('random')
module.exports = async (message, args, db) => {
	Random.use(message.author.tag)
	let msg;
	let arguments = args.join('');
	arguments = arguments.split(globals.DiceRegex);

	if (arguments.length == 2) {
		let numberOfDice = arguments[0];
		const diceValues = arguments[1];
		const roll = [];
		for (let i = 0; i < numberOfDice; i++) {
			const a = Random.int(1,diceValues);
			roll.push(a);
		}
		if(numberOfDice == 1) { msg = 'n';}
		else { msg = ' ' + numberOfDice;}
		message.reply('Das sind deine Ergebnisse für deine' + msg + ' ' + diceValues + '-seitigen 🎲: ' + roll.join(', ') + '.');
	}
	else {
		message.reply('Leider kann ich damit nichts anfangen. Bitte noch einmal so probieren:\n' +
	                      '!roll <Anzahl> W <Augenzahl>');
	}
};