const Discord = require('discord.js');
const { Capitalize } = require('@dsabot/Capitalize');
const { TalentKategorien } = require('../globals');
const { Talente } = require('../globals');

const GenerateTalentList = () => {
    const TalentList = [];
    TalentKategorien.forEach(Category => {
        TalentList.push({
            Category: Category,
            Talents: Talente.filter(
                Talent => Talent.categoryid === TalentKategorien.indexOf(Category)
            )
                .map(Talent => Capitalize(Talent.id))
                .sort(),
        });
    });

    return TalentList.sort();
};

module.exports = {
    name: 'talents',
    description: '',
    aliases: [],
    usage: '',
    needs_args: false,

    async exec(message) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Talentübersicht')
            .setDescription('Das sind die Talente, die ich kenne:');

        const TalentList = GenerateTalentList();
        TalentList.forEach(Talent => {
            Embed.addField(Talent.Category, Talent.Talents.join('\n'), true);
        });

        return message.author.send(Embed);
    },
};
