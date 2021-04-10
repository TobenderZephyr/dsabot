// eslint-disable-next-line no-unused-vars
const Random = require('random');
const globals = require('../globals');
const Discord = require('discord.js');
const { roll } = require('@dsabot/Roll');
const { findMessage }= require('@dsabot/findMessage');
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
			return message.reply(findMessage('WRONG_ARGUMENTS'));
		}

		//Random.use(message.author.tag);
		//const dice = [];
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
		/*for (let i = 1; i <= 3; i++) {
			roll.push(Random.int(1, 20));
		}*/
		const dice = roll(3,20,message.author.tag).dice;

		let ok = 0;
		let patzer = 0;
		let crit = 0;
		for (let i = 0; i < 3; i++) {
			if (Math.floor(parseInt(args[i]) + parseInt(erschwernis)) >= dice[i]) {
				ok++;
			} else if (
				Math.floor(parseInt(args[i]) + parseInt(bonus) + parseInt(erschwernis)) >= dice[i]) {
				ok++;
				bonus = bonus - (dice[i] - parseInt(erschwernis) - parseInt(args[i]));
			}
			if (dice[i] == 1) {crit++;}
			if (dice[i] == 20) {patzer++;}
		}

		const Reply = new Discord.MessageEmbed();
		Reply.setTitle(`${findMessage('ROLL')} ${dice.join(', ')}.`);
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
				value: 'Nur ' + ok + '/3 Proben erfolgreich. 😪',
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
};