const globals = require('../globals');
const Discord = require('discord.js');
const db = globals.db;
const {
	roll
} = require('@dsabot/Roll');
const {
	findMessage
} = require('@dsabot/findMessage');

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
			}, function (err, docs) {
				if (docs.length === 0) {
					return message.reply(findMessage('NOENTRY'));
				}
				if (!isNaN(args[0])) {
					return message.reply(findMessage('WRONG_ARGUMENTS'));
				} else {
					const Character = docs[0].character;
					const values = [];

					const erschwernis = parseInt(args[1]) || 0;
					const talent = globals.Talente.find(talent => talent.id.toLocaleLowerCase() === args[0].toLowerCase());

					if (!talent) {
						return message.reply(findMessage('TALENT_UNKNOWN'));
					}

					let bonus = Character.skills.find(skill => skill.id === talent.id).level || 0;
					const bonus_orig = bonus;

					talent.values.forEach(v => {
						let abbr = globals.Werte.find(wert => wert.kuerzel === v);
						values.push((Character.attributes.find(attr => attr.id === abbr.id)).level);
					});
					const dice = roll(3, 20, message.author.tag).dice;

					let ok = 0;
					let patzer = 0;
					let crit = 0;

					// compare results
					for (let i = 0; i < dice.length; i++) {
						if (Math.floor(values[i] + erschwernis) >= dice[i]) {
							ok++;
						} else if (Math.floor(values[i] + bonus + erschwernis) >= dice[i]) {
							ok++;
							bonus -= (dice[i] - erschwernis - values[i]);
						}
						if (dice[i] == 1) {
							crit++;
						}
						if (dice[i] == 20) {
							patzer++;
						}
					}
					const Reply = new Discord.MessageEmbed();
					Reply.setTitle('Du würfelst auf das Talent ' + talent.name + '. (v2)');
					Reply.setDescription('Deine Werte für ' + talent.values.join(', ') + ' sind ' + values.join(', ') + '. (Bonus: ' + bonus_orig + ')');
					Reply.addFields({
						name: 'Deine 🎲: ' + dice.join(', ') + '.',
						value: '\u200B',
						inline: false
					});
					if (patzer >= 2) {
						Reply.setColor('#900c3f');
						Reply.addFields({
							name: findMessage('TITLE_CRIT_FAILURE'),
							value: findMessage('MSG_CRIT_FAILURE'),
							inline: false
						});
					} else if (crit >= 2) {
						Reply.setColor('#1E8449');
						Reply.addFields({
							name: findMessage('TITLE_CRIT_SUCCESS'),
							value: findMessage('MSG_CRIT_SUCCESS'),
							inline: false
						});
					} else if (ok < 3) {
						Reply.addFields({
							name: findMessage('TITLE_FAILURE'),
							value: 'nur ' + ok + '/3 Proben erfolgreich. 😪',
							inline: false
						});
					} else {
						Reply.addFields({
							name: findMessage('TITLE_SUCCESS'),
							value: ok + '/3 Proben erfolgreich. Dein Bonus: ' + bonus + '/' + bonus_orig + '.',
							inline: false
						});
					}

					message.reply(Reply);
				}
			});
		} catch (e) {
			throw e;
		}
	},
};