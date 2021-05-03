// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');
const { CompareResults } = require('@dsabot/CompareResults');

module.exports = {
    name: 'tp',
    description:
        'Du machst eine Fertigkeitsprobe.\n' +
        ' Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Hast du Boni auf dein Talent und/oder' +
        ' ist der Wurf erleichtert oder erschwert, wird dies in die Berechnung einbezogen.',
    aliases: ['talentprobe'],
    usage:
        '<Eigenschaftswert1> <Eigenschaftswert2> <Eigenschaftswert3> [<Fertigkeitswert>] [<-Erschwernis> / <+Erleichterung>]',
    needs_args: true,

    async exec(message, args) {
        if (Number.isNaN(args[0])) {
            return message.reply(findMessage('WRONG_ARGUMENTS'));
        }

        const Bonus = parseInt(args[3], 10) || 0;
        const Erschwernis = parseInt(args[4], 10) || 0;

        const { dice } = roll(3, 20, message.author.tag);

        const { Passed, CriticalHit, Fumbles, PointsRemaining } = CompareResults(
            dice,
            [args[0], args[1], args[2]],
            Bonus,
            Erschwernis
        );

        const Reply = new Discord.MessageEmbed();
        Reply.setTitle(`${findMessage('ROLL')} ${dice.join(', ')}.`);
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
                value: `${Passed ? `Nur ${Passed}/3 Proben` : `Keine Probe`} erfolgreich. 😪`,
                inline: false,
            });
        } else {
            Reply.addFields({
                name: findMessage('TITLE_SUCCESS'),
                value: `${Passed}/3 Proben erfolgreich. Dein Bonus: ${PointsRemaining}/${Bonus}`,
                inline: false,
            });
        }
        return message.reply(Reply);
    },
};
