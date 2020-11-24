// eslint-disable-next-line no-unused-vars
module.exports = async (message, args, db) => {
	let msg;
	let arguments = args.join('');
	const regex = /\s?[DdWw]\s?/;
	arguments = arguments.split(regex);

	if (arguments.length == 2) {
		let numberOfDice = arguments[0];
		const diceValues = arguments[1];
		const roll = [];
		for (let i = 0; i < numberOfDice; i++) {
			const a = Math.floor(Math.random() * diceValues) + 1;
			roll.push(a);
		}
		if(numberOfDice = 1) { let = 'n';}
		else { msg = ' ' + numberOfDice;}
		message.reply('Das sind deine Ergebnisse für deine' + msg + ' ' + diceValues + '-seitigen 🎲: ' + roll.join(', ') + '.');
	}
	else {
		message.reply('Leider kann ich damit nichts anfangen. Bitte noch einmal so probieren:\n' +
	                      '!roll <Anzahl> W <Augenzahl>');
	}
};