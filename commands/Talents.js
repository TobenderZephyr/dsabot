const globals = require('../globals');
const Discord = require('discord.js');
const { Capitalize } = require('@dsabot/Capitalize');

module.exports = {
	name: 'talents',
	description: '',
	aliases: [],
	usage: '',
	needs_args: false,

	async exec(message, args) {

		const Embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Talentübersicht')
			.setDescription('Das sind die Talente, die ich kenne:');
		for (let Talent of GenerateTalentList()) {
			Embed.addField(Talent.Category, Talent.Talents.join('\n'), true);
		}
		message.author.send(
			Embed,
		);
	},
};

const GenerateTalentList = () => {
	const Categories = globals.TalentKategorien;
	const Talents = globals.Talente;
	const TalentList = [];

	Categories.forEach(Category => {
		TalentList.push({
			Category: Category,
			Talents: Talents.filter(Talent => Talent.categoryid === Categories.indexOf(Category))
					.map(Talent => Capitalize(Talent.id))
					.sort()
		});	
	});

	return TalentList.sort();
};