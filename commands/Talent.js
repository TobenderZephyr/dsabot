const Discord = require('discord.js');
const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');
const { getSkill } = require('@dsabot/getSkill');
const { CalculateQuality } = require('@dsabot/CalculateQuality');
const { CompareResults } = require('@dsabot/CompareResults');
const { CreateResultTable } = require('@dsabot/CreateResultTable');
const { db } = require('../globals');

module.exports = {
    name: 'talent',
    description:
        ' Du machst eine Fertigkeitsprobe.\n' +
        ' Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Hast du Boni auf dein Talent und/oder' +
        ' ist der Wurf erleichtert oder erschwert, wird dies in die Berechnung einbezogen.',
    aliases: ['t'],
    usage: '<Talent> [<-Erschwernis> / <+Erleichterung>]',
    needs_args: true,
    async exec(message, args) {
        db.find({ user: message.author.tag }).then(docs => {
            if (docs.length === 0) {
                return message.reply(findMessage('NOENTRY'));
            }
            if (!Number.isNaN(args[0])) {
                return message.reply(findMessage('WRONG_ARGUMENTS'));
            }

            const Skill = getSkill({ Character: docs[0].character, args: args });
            if (!Skill) {
                return message.reply(findMessage('TALENT_UNKNOWN'));
            }

            const { Attributes } = Skill;
            const DiceThrow = roll(3, 20, message.author.tag).dice;
            const Bonus = parseInt(args[1], 10) || 0;
            const { Passed, CriticalHit, Fumbles, PointsUsed, PointsRemaining } = CompareResults(
                DiceThrow,
                Attributes.map(attr => attr.Level),
                Bonus,
                Skill.Level
            );
            const Reply = new Discord.MessageEmbed();
            Reply.addFields({
                name: `Du würfelst auf das Talent **${Skill.Name}** (Stufe ${Skill.Level} + ${Bonus})`,
                value: CreateResultTable({
                    Attributes: Attributes,
                    Throws: DiceThrow,
                    PointsUsed: PointsUsed,
                    Bonus: Bonus,
                }),
                inline: false,
            });
            if (Fumbles >= 2) {
                Reply.setColor('#900c3f');
                Reply.addFields({
                    name: findMessage('TITLE_CRIT_FAILURE'),
                    value: findMessage('MSG_CRIT_FAILURE'),
                    inline: false,
                });
            } else if (CriticalHit >= 2) {
                Reply.setColor('#1E8449');
                Reply.addFields({
                    name: findMessage('TITLE_CRIT_SUCCESS'),
                    value: findMessage('MSG_CRIT_SUCCESS'),
                    inline: false,
                });
            } else if (Passed < 3) {
                Reply.addFields({
                    name: findMessage('TITLE_FAILURE'),
                    value: `${
                        Passed === 0 ? 'Keine Probe' : `nur ${Passed}/3 Proben`
                    } erfolgreich. 😪`,
                    inline: false,
                });
            } else {
                Reply.addFields({
                    name: findMessage('TITLE_SUCCESS'),
                    value: `Dein verbleibender Bonus: ${PointsRemaining}/${
                        Skill.Level
                    } (QS${CalculateQuality(PointsRemaining)})`,
                    inline: false,
                });
            }
            return message.reply(Reply);
        });
    },
};
