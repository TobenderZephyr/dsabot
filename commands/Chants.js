//const globals = require('../globals');
const globals = require('../globals');
const Discord = require('discord.js');
const db = globals.db;
const { findMessage } = require('@dsabot/findMessage');
const { getChant } = require('@dsabot/getChant');
module.exports = {
    name: 'chants',
    description: 'Zeigt dir deinen Fertigkeitswert im jeweiligen Magietalent (Götterwirken).',
    aliases: ['segen', 'liturgie', 'liturgien', 'zeremonien'],
    usage: '[<Liturgie / Zeremonie>]',
    needs_args: false,

    async exec(message, args) {
        db.find({ user: message.author.tag }, (err, docs) => {
            if (docs.length === 0) {
                return message.reply(findMessage('NOENTRY'));
            }
            const Character = docs[0].character;
            if (!Character.hasOwnProperty('chants')) return message.reply(findMessage('NO_CHANTS'));
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
        });
    },
};

const createChantList = (Character = {}) => {
    if (!Character || !Character.hasOwnProperty('chants')) return;
    let ChantList = [];

    // todo: send 'chant' to getChant() so we can filter out blessings.
    Character.chants.forEach(chant => ChantList.push(getChant({ Character: Character, chant_name: chant.id })));
    return ChantList.filter(value => value !== undefined);
};

const ReplyChantList = (ChantList = []) => {
    if (!ChantList) return;
    return `${ChantList.map(chant => `${chant.Name} ${chant.Level ? `(${chant.Level})` : ''}`).join('\n')}`;
};

const ReplyChant = (Chant = {}) => {
    if (!Chant) return;
    return `Deine Werte für ${Chant.Name} ${Chant.Level ? '(' + Chant.Level + ')' : ''} sind:

    ${Chant.Attributes.map(attribute => `${attribute.Name}: ${attribute.Level}`).join('   ')}
    `;
};
