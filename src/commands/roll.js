// eslint-disable-next-line no-unused-vars
module.exports = async (message, args, db) => {
	let command = args.join('')
	let regex = /\s?[DdWw]\s?/;
	let command = command.split(regex);

	if (command.length == 2){
		let numberOfDice = command[0];
		let diceValues = command[1];
		let roll = [];
		for (let i = 0; i<numberOfDice; i++) {
			let a = Math.floor(Math.random() * diceValues) + 1;
			roll.push(a)
		}
		message.reply('Das waren deine 🎲 für ' + command.join('').toUpperCase() + ':' + roll.join(', ') + '.')
	}
	else { message.reply('Leider kann ich damit nichts anfangen. Bitte noch einmal so probieren:\n'+
	                      '!roll <Anzahl> W <Augenzahl>')}
};