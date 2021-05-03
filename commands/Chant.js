const Discord = require('discord.js');
const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');
const { getChant } = require('@dsabot/getChant');
const { CalculateQuality } = require('@dsabot/CalculateQuality');
const { CompareResults } = require('@dsabot/CompareResults');
const { CreateResultTable, f } = require('@dsabot/CreateResultTable');
const { db } = require('../globals');

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
        db.findOne({ user: message.author.tag })
            .then(doc => {
                if (Object.keys(doc).length === 0) {
                    return message.reply(findMessage('NOENTRY'));
                }
                if (!doc.character.hasOwnProperty('chants'))
                    return message.reply(findMessage('NO_CHANTS'));
                if (!Number.isNaN(args[0])) {
                    return message.reply(findMessage('WRONG_ARGUMENTS'));
                }
                const Chant = getChant({ Character: doc.character, chant_name: args[0] });
                if (!Chant) {
                    return message.reply(findMessage('CHANT_UNKNOWN'));
                }
                if (!Chant.Level || !Chant.Attributes) {
                    return null;
                }
                const { Attributes } = Chant;
                const DiceThrow = roll(3, 20, message.author.tag).dice;
                const Bonus = parseInt(args[1], 10) || 0;
                const {
                    Passed,
                    CriticalHit,
                    Fumbles,
                    PointsUsed,
                    PointsRemaining,
                } = CompareResults(
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
                        value: `${
                            Passed === 0 ? 'Keine Probe' : `nur ${Passed}/3 Proben`
                        } erfolgreich. 😪`,
                        inline: false,
                    });
                } else {
                    Reply.addFields({
                        name: findMessage('TITLE_SUCCESS'),
                        value: `Dein verbleibender Bonus: ${PointsRemaining}/${
                            Chant.Level
                        } (QS${CalculateQuality(PointsRemaining)})`,
                        inline: false,
                    });
                }
                return message.reply(Reply);
            })
            .catch(err => {
                message.reply(findMessage('ERROR'));
                throw new Error(err);
            });
    },
};
