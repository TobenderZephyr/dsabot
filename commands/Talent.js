const globals = require('../globals');
const Random = require('random');
const Discord = require('discord.js');
const db = globals.db;

module.exports = {
	name: 'talent',
	description: ' Du machst eine Fertigkeitsprobe.\n' +
	' Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Hast du Boni auf dein Talent und/oder' +
	' ist der Wurf erleichtert oder erschwert, wird dies in die Berechnung einbezogen.',
	aliases: ['t'],
	usage: '<Talent> [<-Erschwernis> / <+Erleichterung>]',
	needs_args: true,
	async exec(message, args) {
		try {
			db.find({
				user: message.author.tag,
			}, function(err, docs) {
				if (docs.length === 0) {
					return message.reply(globals.Replies.find(r => r.id === 'NOENTRY').string);
				}
				if(!isNaN(args[0])) {
					return message.reply(globals.Replies.find(x => x.id === 'WRONG_ARGUMENTS').string);
				}
				else {
					Random.use(message.author.tag);
					const values = [];
					const roll = [];
					let found = false;
					let talent;
					let bonus = 0;
					let ok = 0;
					let patzer = 0;
					let crit = 0;
					let erschwernis = 0;

					if (args[1]) {
						 erschwernis = parseInt(args[1]);
					}

					for (let i in globals.Talente) {
						if (globals.Talente[i].id.toLowerCase() == args[0].toLowerCase() || globals.Talente[i].name.toLowerCase() == args[0].toLowerCase()) {
							found = true;
							talent = globals.Talente[i].id;
							break;
						}
					}
					if (!found) {
						message.reply(globals.Replies.find(x => x.id === 'TALENT_UNKNOWN').string);
						return;
					}
					for (let i in docs[0].character.skills) {
						if (docs[0].character.skills[i].id == talent) {
							bonus = docs[0].character.skills[i].level;
							found = true;
						}
					}

					const bonus_orig = bonus;
					const result = globals.Talente.find(t => t.id === talent);

					result.values.forEach(value => {
						let kuerzel = globals.Werte.find(wert => wert.kuerzel === value);
						docs[0].character.attributes.forEach(attr => {
							if (attr == kuerzel.id) { values.push(attr.level);}
						});
					});

					for (let i = 1; i <= 3; i++) {
						roll.push(Random.int(1, 20));
					}
					// compare results
					for (let i = 0; i < 3; i++) {
						if (Math.floor(values[i] + parseInt(erschwernis)) >= roll[i]) {
							ok++;
						}
						else if ((Math.floor(values[i]) + parseInt(bonus) + parseInt(erschwernis)) >= roll[i]) {
							ok++;
							bonus = bonus - (roll[i] - parseInt(erschwernis) - values[i]);
						}
						if (roll[i] == 1) crit++;
						if (roll[i] == 20) patzer++;
					}
					const Reply = new Discord.MessageEmbed();
					Reply.setTitle('Du würfelst auf das Talent ' + result.name + '.');
					Reply.setDescription('Deine Werte für ' + result.values.join(', ') + ' sind ' + values.join(', ') + '. (Bonus: ' + bonus_orig + ')');
					Reply.addFields({
						name: 'Deine 🎲: ' + roll.join(', ') + '.',
						value: '\u200B', inline: false});
					if (patzer >= 2) {
						Reply.setColor('#900c3f');
						Reply.addFields({
							name: globals.Replies.find(x => x.id === 'TITLE_CRIT_FAILURE').string, 
							value: globals.Replies.find(x => x.id === 'MSG_CRIT_FAILURE').string, 
							inline: false});
					}
					else if (crit >= 2) {
						Reply.setColor('#1E8449');
						Reply.addFields({
							name: globals.Replies.find(x => x.id === 'TITLE_CRIT_SUCCESS').string, 
							value:globals.Replies.find(x => x.id === 'MSG_CRIT_SUCCESS').string,
							inline: false});
					}
					else if (ok < 3) {
						Reply.addFields({name: globals.Replies.find(x => x.id === 'TITLE_FAILURE').string,
						value: 'nur ' + ok + '/3 Proben erfolgreich. 😪',
						inline: false});
					}
					else {
						Reply.addFields({name: globals.Replies.find(x => x.id === 'TITLE_SUCCESS').string,
						value: ok + '/3 Proben erfolgreich. Dein Bonus: ' + bonus + '/' + bonus_orig + '.', 
            inline: false});
					}

					message.reply(Reply);
				}
			});
		}
		catch (e) {
			throw e;
		}
	},
};