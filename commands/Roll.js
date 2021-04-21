// eslint-disable-next-line no-unused-vars
const globals = require('../globals');
const { roll } = require('@dsabot/Roll');
const { findMessage }= require('@dsabot/findMessage');

module.exports = {
	name: 'roll',
	description: 'Lass die Würfel rollen. Benötigt wird die Anzahl sowie die Augenzahl auf den Würfeln.',
	aliases: ['r'],
	usage: '<Anzahl> w <Augenzahl>',
	needs_args: true,
	async exec(message, args) {
		let params = args.join('').split(globals.DiceRegex);
		if ( params.length >= 2 ) {
			const Bonus = params[2] || 0;
			const numberOfDice = parseInt( params[0] );
			const diceValues = parseInt( params[1] );
			const result = roll( numberOfDice, diceValues, message.author.tag );
			message.reply(`${findMessage('ROLL')} ${result.dice.join(', ')} (Gesamt: ${result.sum} + ${Bonus} = ${result.sum + Bonus})` );
		}
	},
};