const globals = require('../globals');
module.exports = async (message, args, db) => {
	try {
		db.find({
			user: message.author.tag,
		}, function(err, docs) {
			if (!docs.length > 0) {message.reply('Sorry, Für dich habe ich keinen Eintrag 😥');}
			else {
				if (!args) message.reply('Sorry, du musst mir schon etwas zum prüfen geben.');
				if (args[1]) {
					var erschwernis = parseInt(args[1]);
				}
				else {
					erschwernis = 0;
				}
				const values = [];
				const roll = [];
				let bonus = 0;
				let ok = 0;
				let patzer = 0;
				let crit = 0;
				for (i in docs[0].character.skills) {
					if (docs[0].character.skills[i].id == args[0]) bonus = docs[0].character.skills[i].level;
				}
				const bonus_orig = bonus;
				const result = globals.Talente.find(talent => talent.id === args[0]);

				for (i in result.values) {
					const kuerzel = globals.Werte.find(wert => wert.kuerzel === result.values[i]);
					for (val in docs[0].character.attributes) {
						if (docs[0].character.attributes[val].id == kuerzel.id) values.push(docs[0].character.attributes[val].level);
					}
				}
				// message.reply(`Du musst mit ${result.values.join(", ")} würfeln. Die werte sind: ${values.join(", ")}. Dein Bonus auf ${result.name}: ${bonus}`)


				// roll dice.
				for (i = 1; i <= 3; i++) {
					const a = Math.floor(Math.random() * 20 + 1);
					roll.push(a);
				}
				// compare results
				for (i = 0; i < 3; i++) {
					if (Math.floor(values[i] + parseInt(erschwernis)) >= roll[i]) {ok++;}
					else if ((Math.floor(values[i]) + parseInt(bonus) + parseInt(erschwernis)) >= roll[i]) {
						ok++;
						bonus = bonus - (roll[i] - parseInt(erschwernis) - values[i]);
					}
					if (roll[i] == 1) crit++;
					if (roll[i] == 20) patzer++;
				}
				if (patzer >= 2) {
					message.reply('Du würfelst auf das Talent ' + result.name + '.\n' +
            'Deine Werte für ' + result.values.join(', ') + ' sind ' + values.join(', ') + '.\n' +
            'Deine 🎲: ' + roll.join(', ') + '. Patzer! Du hast aber auch Pech 😥',
					);
				}
				else if (crit >= 2) {
					message.reply('Du würfelst auf das Talent ' + result.name + '.\n' +
            'Deine Werte für ' + result.values.join(', ') + ' sind ' + values.join(', ') + '.\n' +
            'Deine 🎲: ' + roll.join(', ') + '. Damit hast du einen kritischen Erfolg erzielt 🎈✨🥳',
					);
				}
				else if (ok < 3) {
					message.reply('Du würfelst auf das Talent ' + result.name + '.\n' +
            'Deine Werte für ' + result.values.join(', ') + ' sind ' + values.join(', ') + '. (Bonus: ' + bonus_orig + ')\n' +
            'Deine 🎲: ' + roll.join(', ') + '. Damit hast du nur ' + ok + '/3 Proben bestanden. 😪',
					);
				}
				else {
					message.reply('Du würfelst auf das Talent ' + result.name + '.\n' +
            'Deine Werte für ' + result.values.join(', ') + ' sind ' + values.join(', ') + '. (Bonus: ' + bonus_orig + ')\n' +
            'Das waren deine 🎲: ' + roll.join(', ') + '. Damit hast du ' + ok + '/3 Proben bestanden. Dein Bonus: ' + bonus + '/' + bonus_orig + '.',
					);
				}


			}
		});
	}
	catch (e) {
		throw e;
	}
};