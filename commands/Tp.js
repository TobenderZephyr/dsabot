// eslint-disable-next-line no-unused-vars
const Random = require('random');
const globals = require('../globals');
const Discord = require('discord.js');

module.exports = {
	name: 'tp',
	description: 'Du machst eine Fertigkeitsprobe.\n' +
	' Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Hast du Boni auf dein Talent und/oder' +
	' ist der Wurf erleichtert oder erschwert, wird dies in die Berechnung einbezogen.',
	aliases: ['talentprobe'],
	usage: '<Eigenschaftswert1> <Eigenschaftswert2> <Eigenschaftswert3> [<Fertigkeitswert>] [<-Erschwernis> / <+Erleichterung>]',
	needs_args: true,

	async exec(message, args) {

		if(isNaN(args[0])) {
			return message.reply(globals.Replies.find(x => x.id === 'WRONG_ARGUMENTS').string);
		}

		Random.use(message.author.tag);
		const roll = [];
		let bonus = 0;
		let bonus_orig = 0;
		let erschwernis = 0;
		if (args[3]) {
			bonus_orig = parseInt(args[3]);
			bonus = bonus_orig;
		}
		if (args[4]) {
			erschwernis = parseInt(args[4]);
		}
		for (let i = 1; i <= 3; i++) {
			roll.push(Random.int(1, 20));
		}
		let ok = 0;
		let patzer = 0;
		let crit = 0;
		for (let i = 0; i < 3; i++) {
			if (Math.floor(parseInt(args[i]) + parseInt(erschwernis)) >= roll[i]) {
				ok++;
			} else if (
				Math.floor(parseInt(args[i]) + parseInt(bonus) + parseInt(erschwernis)) >= roll[i]) {
				ok++;
				bonus = bonus - (roll[i] - parseInt(erschwernis) - parseInt(args[i]));
			}
			if (roll[i] == 1) crit++;
			if (roll[i] == 20) patzer++;
		}

		const Reply = new Discord.MessageEmbed();
		//Reply.setTitle('Du würfelst auf ' + args[0] + ' ' + args[1] + ' ' + args[2] + ' (Bonus: ' + bonus_orig + ')')
		Reply.setTitle('Deine 🎲: ' + roll.join(', ') + '.');
		if (patzer >= 2) {
			Reply.setColor('#900c3f');
			Reply.addFields({
				name: globals.Replies.find(x => x.id === 'TITLE_CRIT_FAILURE').string,
				value: globals.Replies.find(x => x.id === 'MSG_CRIT_FAILURE').string,
				inline: false
			});
		} else if (crit >= 2) {
			Reply.setColor('#1E8449');
			Reply.addFields({
				name: globals.Replies.find(x => x.id === 'TITLE_CRIT_SUCCESS').string,
				value: globals.Replies.find(x => x.id === 'MSG_CRIT_SUCCESS').string,
				inline: false
			});
		} else if (ok < 3) {
			Reply.addFields({
				name: globals.Replies.find(x => x.id === 'TITLE_FAILURE').string,
				value: 'Nur ' + ok + '/3 Proben erfolgreich. 😪',
				inline: false
			});
		} else {
			Reply.addFields({
				name: globals.Replies.find(x => x.id === 'TITLE_SUCCESS').string,
				value: ok + '/3 Proben erfolgreich. Dein Bonus: ' + bonus + '/' + bonus_orig + '.',
				inline: false
			});
		}
		message.reply(Reply);
	}
};