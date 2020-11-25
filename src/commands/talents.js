const globals = require('../globals')
const Discord = require('discord.js')
module.exports = async (message, args, db) => {
    let fields = []
    for (let i in globals.TalentKategorien) {
        let ability = []
        for (let a in globals.Talente) {
            if(globals.Talente[a].categoryid == i) {
                ability.push(globals.Talente[a].id.charAt(0).toUpperCase() + globals.Talente[a].id.slice(1));
            }
        }
        ability.sort()
        fields.push(ability)
    }

    const Embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Talentübersicht')
	.setDescription('Das sind die Talente, die ich kenne:')
    for (let i in fields) {
        Embed.addField(globals.TalentKategorien[i], fields[i].join('\n'), true);
    }
    message.author.send(
        Embed
        );
};