const globals = require('../globals');
const Discord = require('discord.js');


module.exports = {
	name: 'weapons',
	description: 'Listet eine Übersicht, welche für einen Angriff genutzt werden können.',
	aliases: ['waffen'],
	usage: '',
	needs_args: false,

	async exec(message, args) {
		const Embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Waffenübersicht')
			.setDescription('Folgende Waffen können für einen Angriff genutzt werden:');
		for (let Technique of GenerateWeaponList()) {
			Embed.addField(Technique.Technique_Name, Technique.Weapons.join('\n'), true);
		}
		message.author.send(
			Embed,
		);
	},
};

const GenerateWeaponList = () => {
	let WeaponList = [];
	const Techniques = globals.CombatTechniques;
	const Weapons = globals.Weapons;

	Techniques.forEach(Technique => {
		WeaponList.push({
			Technique_Name: Technique.name, 
			Weapons: Weapons.filter(Weapon => Weapon.combattechnique === Technique.id)
							.map(Weapon => Capitalize(Weapon.id))
		});
	});
	return WeaponList.sort();
};

const Capitalize = (Word = '') => {
	return Word[0].toUpperCase() + Word.substring(1);
};