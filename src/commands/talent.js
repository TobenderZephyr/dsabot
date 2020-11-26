const globals = require('../globals');
const Random = require('random')
module.exports = async (message, args, db) => {
	try {
		db.find({
			user: message.author.tag,
		}, function(err, docs) {
			if (!docs.length > 0) {message.reply('Sorry, Für dich habe ich keinen Eintrag 😥');}
			else {
				
				if (!args){ 
					message.reply('Sorry, du musst mir schon etwas zum prüfen geben.');
					return
				}

				Random.use(message.author.tag)
				
				if (args[1]) {
					var erschwernis = parseInt(args[1]);
				}
				else {
					erschwernis = 0;
				}
				const values = [];
				const roll = [];
				let found = false;
				let talent
				let bonus = 0;
				let ok = 0;
				let patzer = 0;
				let crit = 0;

				for (i in globals.Talente)
				{
					if (globals.Talente[i].id.toLowerCase() == args[0].toLowerCase()||globals.Talente[i].name.toLowerCase()==args[0].toLowerCase()) {
						found=true
						talent = globals.Talente[i].id
						break;
					}
				}
				if (!found) {
					message.reply('Sorry, das Talent ist mir unbekannt.');
					return;
				}
				for (i in docs[0].character.skills) {
					if (docs[0].character.skills[i].id == talent) {bonus = docs[0].character.skills[i].level; found = true;}
				}

				const bonus_orig = bonus;
				const result = globals.Talente.find(t => t.id === talent);

				for (i in result.values) {
					const kuerzel = globals.Werte.find(wert => wert.kuerzel === result.values[i]);
					for (val in docs[0].character.attributes) {
						if (docs[0].character.attributes[val].id == kuerzel.id) values.push(docs[0].character.attributes[val].level);
					}
				}

				for (i = 1; i <= 3; i++) {
					roll.push(Random.int(1,20));
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