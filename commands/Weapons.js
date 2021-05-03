const Discord = require('discord.js');
const { Capitalize } = require('@dsabot/Capitalize');
const { CombatTechniques } = require('../globals');
const { Weapons } = require('../globals');

const GenerateWeaponList = () => {
    const WeaponList = [];
    CombatTechniques.forEach(Technique => {
        WeaponList.push({
            Technique_Name: Technique.name,
            Weapons: Weapons.filter(Weapon => Weapon.combattechnique === Technique.id).map(Weapon =>
                Capitalize(Weapon.id)
            ),
        });
    });
    return WeaponList.sort();
};

module.exports = {
    name: 'weapons',
    description: 'Listet eine Übersicht, welche für einen Angriff genutzt werden können.',
    aliases: ['waffen'],
    usage: '',
    needs_args: false,

    async exec(message) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Waffenübersicht')
            .setDescription('Folgende Waffen können für einen Angriff genutzt werden:');
        const WeaponList = GenerateWeaponList();
        WeaponList.forEach(Technique => {
            Embed.addField(Technique.Technique_Name, Technique.Weapons.join('\n'), true);
        });

        return message.author.send(Embed);
    },
};
