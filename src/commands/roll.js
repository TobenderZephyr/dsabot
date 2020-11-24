// eslint-disable-next-line no-unused-vars
module.exports = async (message, args, db) => {
	let arguments = args.join('')
	let regex = /\s?[DdWw]\s?/;
	arguments = arguments.split(regex);

	if (arguments.length == 2){
		let numberOfDice = arguments[0];
		let diceValues = arguments[1];
		let roll = [];
		for (let i = 0; i<numberOfDice; i++) {
			let a = Math.floor(Math.random() * diceValues) + 1;
			roll.push(a)
		}
		if(numberOfDice=1) { let msg = 'n'}
		else { let msg = ' ' + numberOfDice;}
		message.reply('Das sind deine Ergebnisse für deine' + msg +' ' + diceValues + '-seitigen 🎲: ' + roll.join(', ') + '.')
	}
	else { message.reply('Leider kann ich damit nichts anfangen. Bitte noch einmal so probieren:\n'+
	                      '!roll <Anzahl> W <Augenzahl>')}
};