const globals = require('../globals');
const Discord = require('discord.js');
const db = globals.db;
const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');
const { getChant } = require('@dsabot/getChant');
const { CalculateQuality } = require('@dsabot/CalculateQuality');
const { CompareResults } = require('@dsabot/CompareResults');
const { CreateResultTable, f } = require('@dsabot/CreateResultTable');
module.exports = {
    name: 'chant',
    description:
        ' Du machst eine Fertigkeitsprobe auf Magietalente.\n' +
        ' Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Deine Boni werden in' +
        ' die Berechnung einbezogen.',
    aliases: [''],
    usage: '<Liturgie/Zeremonie> [<-Erschwernis> / <+Erleichterung>]',
    needs_args: false,
    async exec(message, args) {
        db.find({ user: message.author.tag }, (err, docs) => {
            if (docs.length === 0) {
                return message.reply(findMessage('NOENTRY'));
            }
            if (!docs[0].character.hasOwnProperty('chants')) return message.reply(findMessage('NO_CHANTS'));
            if (!isNaN(args[0])) {
                return message.reply(findMessage('WRONG_ARGUMENTS'));
            }
            const Chant = getChant({ Character: docs[0].character, chant_name: args[0] });
            if (!Chant) {
                return message.reply(findMessage('CHANT_UNKNOWN'));
            }
            if (!Chant.Level || !Chant.Attributes) {
                return;
            }
            const Attributes = Chant.Attributes;
            const DiceThrow = roll(3, 20, message.author.tag).dice;
            const Bonus = parseInt(args[1]) || 0;
            let { Passed, CriticalHit, Fumbles, PointsUsed, PointsRemaining } = CompareResults(
                DiceThrow,
                Attributes.map(attr => attr.Level),
                Bonus,
                Chant.Level
            );
            const Reply = new Discord.MessageEmbed();
            Reply.addFields({
                name: `Du würfelst auf die Liturgie **${Chant.Name}** ( Stufe ${Chant.Level} ${
                    Bonus ? `${f(Bonus)} ` : ''
                })`,
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
                    value: `${Passed === 0 ? 'Keine Probe' : `nur ${Passed}/3 Proben`} erfolgreich. 😪`,
                    inline: false,
                });
            } else {
                Reply.addFields({
                    name: findMessage('TITLE_SUCCESS'),
                    value: `Dein verbleibender Bonus: ${PointsRemaining}/${Chant.Level} (QS${CalculateQuality(
                        PointsRemaining
                    )})`,
                    inline: false,
                });
            }
            message.reply(Reply);
        });
    },
};
