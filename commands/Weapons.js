const globals = require('../globals');
const Discord = require('discord.js');


module.exports = {
	name: 'weapons',
	description: 'Listet eine Übersicht, welche für einen Angriff genutzt werden können.',
	aliases: ['waffen'],
	usage: '',
	needs_args: false,

	async exec(message, args) {
		let fields = [];
		for (let CombatTechnique in globals.CombatTechniques) {
			let Weapons = [];
			for (let Weapon in globals.Weapons) {
				if (globals.Weapons[Weapon].combattechnique == globals.CombatTechniques[CombatTechnique].id) {
					Weapons.push(globals.Weapons[Weapon].id.charAt(0).toUpperCase() + globals.Weapons[Weapon].id.slice(1));
				}
			}
			Weapons.sort();
			fields.push(Weapons);
		}

		const Embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Waffenübersicht')
			.setDescription('Folgende Waffen können für einen Angriff genutzt werden:');
		for (let i in fields) {
			Embed.addField(globals.CombatTechniques[i].name, fields[i].join('\n'), true);
		}
		message.author.send(
			Embed,
		);
	},
};