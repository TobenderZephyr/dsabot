const globals = require('../globals');
const Random = require('random')
module.exports = async (message, args, db) => {
	try {
		// user calls without arguments.
		if (!args[0]) {
			message.reply('Bitte gib mir ein Attributswert, oder das Attribut auf welches du würfeln möchtest.');
			return;
		}
		let level = 8;
        let attributename;

		await db.find({
			user: message.author.tag,
		}, async function(err, docs) {

			// user calls with text. need to gather info from database
			if (isNaN(args[0])) {
				if (!docs.length > 0) {
					message.reply('Sorry, Für dich habe ich keinen Eintrag 😥\n' +
                        'Bitte gib mir den Attributswert, auf welchen du würfeln möchtest.');
					return;
				}
				else {
					// try to get id of short formatted attributes.
					if (args[0].length == 2) {
						for (const i in globals.Werte) {
							if (globals.Werte[i].kuerzel == args[0].toUpperCase()) {
                                attributename = globals.Werte[i].id;
                            }
						}
					}
					else {
						attributename = args[0].toLowerCase();
					}
					for (const i in docs[0].character.attributes) {
						if (docs[0].character.attributes[i].id == attributename) level = docs[0].character.attributes[i].level;
					}
				}
			}
			else {
				level = args[0];
			}
			Random.use(message.author.tag)
			const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
			const dice = [];
			dice.push(Random.int(1,20));
			if (dice[0] == 1 || dice[0] == 20) {
				dice.push(Random.int(1,20));
			}
			// handle crits
			if (countOccurrences(dice, 1) == 2) {
				message.reply('Du hast einen kritischen Erfolg erzielt (' + dice.join(', ') + ')! 🎉🥳🎆');
				return;
			}
			else if (countOccurrences(dice, 20) == 2) {
				message.reply('Du hast einen Patzer (' + dice.join(', ') + ')! 😭 Viel Erfolg beim nächsten mal!');
				return;
			}
			if ((dice.length == 2 && dice[0] != 20 && dice[1] <= level) || (dice.length == 1 && dice[0] <= level)) {
				if (attributename) {
					message.reply('Du hast die Probe auf ' + attributename + ' (Stufe ' + level + ') bestanden.\n' +
                        'Deine 🎲: ' + dice.join(', '));
				}
				else {
					message.reply('Du hast die Probe (Stufe ' + level + ') bestanden.\n' +
                        'Deine 🎲: ' + dice.join(', '));
				}
			}
			else if (attributename) {
				message.reply('Du hast die Probe auf ' + attributename + ' (Stufe ' + level + ') leider nicht bestanden 😢.\n' +
                        'Deine 🎲: ' + dice.join(', '));
			}
			else {
				message.reply('Du hast die Probe (Stufe ' + level + ') leider nicht bestanden 😢.\n' +
                        'Deine 🎲: ' + dice.join(', '));
			}
		});
	}
	catch (e) {
		throw e;
	}
};