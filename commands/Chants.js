require('module-alias/register');
const Discord = require('discord.js');
const { findMessage } = require('@dsabot/findMessage');
const { getChant } = require('@dsabot/getChant');
const { isEmpty } = require('@dsabot/isEmpty');

const { db } = require('../globals');

const createChantList = (Character = {}) => {
    if (!Character || !Character.hasOwnProperty('chants')) return null;
    const ChantList = [];
    Character.chants.forEach(chant =>
        ChantList.push(getChant({ Character: Character, chant_name: chant.id }))
    );
    return ChantList.filter(value => value !== undefined && value !== null);
};

const ReplyChantList = (ChantList = []) => {
    if (!ChantList) return null;
    return `${ChantList.map(chant => `${chant.Name} ${chant.Level ? `(${chant.Level})` : ''}`).join(
        '\n'
    )}`;
};

const ReplyChant = (Chant = {}) => {
    if (!Chant || Object.keys(Chant).length === 0) return null;
    return `Deine Werte für ${Chant.Name} ${Chant.Level ? `(${Chant.Level})` : ''} sind:

    ${Chant.Attributes.map(attribute => `${attribute.Name}: ${attribute.Level}`).join('   ')}
    `;
};

module.exports = {
    name: 'chants',
    description: 'Zeigt dir deinen Fertigkeitswert im jeweiligen Magietalent (Götterwirken).',
    aliases: ['segen', 'liturgie', 'liturgien', 'zeremonien'],
    usage: '[<Liturgie / Zeremonie>]',
    needs_args: false,

    async exec(message, args) {
        db.findOne({ user: message.author.tag })
            .then(doc => {
                if (isEmpty(doc)) {
                    return message.reply(findMessage('NOENTRY'));
                }
                console.log(doc.character);
                const Character = doc.character;
                if (!Character.hasOwnProperty('chants'))
                    return message.reply(findMessage('NO_CHANTS'));
                if (args.length === 0) {
                    const Embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(findMessage('CHANTS_TITLE'))
                        .setDescription(findMessage('CHANTS_DESCRIPTION'))
                        .addField(ReplyChantList(createChantList(Character)), '\u200B', true);
                    return message.reply(Embed);
                }
                const Chant = getChant({
                    Character: Character,
                    chant_name: args[0],
                });
                if (!Chant) {
                    return message.reply(findMessage('SPELL_UNKNOWN'));
                }
                return message.reply(ReplyChant(Chant));
            })
            .catch(err => {
                message.reply(findMessage('ERROR'));
                throw new Error(err);
            });
    },
};
