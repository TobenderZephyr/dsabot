const globals = require('../globals');
const Discord = require('discord.js');


module.exports = {
	name: 'talents',
	description: '',
	aliases: [],
	usage: '',
	needs_args: false,

	async exec(message, args) {
		const fields = [];
		for (const i in globals.TalentKategorien) {
			const ability = [];
			for (const a in globals.Talente) {
				if (globals.Talente[a].categoryid == i) {
					ability.push(globals.Talente[a].id.charAt(0).toUpperCase() + globals.Talente[a].id.slice(1));
				}
			}
			ability.sort();
			fields.push(ability);
		}

		const Embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Talentübersicht')
			.setDescription('Das sind die Talente, die ich kenne:');
		for (const i in fields) {
			Embed.addField(globals.TalentKategorien[i], fields[i].join('\n'), true);
		}
		message.author.send(
			Embed,
		);
	},
};