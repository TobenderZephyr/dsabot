//const globals = require('../globals');
const globals = require('../globals');
const db = globals.db;
const Discord = require('discord.js');
const { findMessage } = require('@dsabot/findMessage');
const { getSpell } = require('@dsabot/getSpell');
module.exports = {
    name: 'spells',
    description: 'Zeigt dir deinen Fertigkeitswert im jeweiligen Magietalent.',
    aliases: ['spell', 'zauber'],
    usage: '<Zauber>',
    needs_args: false,

    async exec(message, args) {
        db.find({ user: message.author.tag }, (err, docs) => {
            if (docs.length === 0) {
                return message.reply(findMessage('NOENTRY'));
            }
            const Character = docs[0].character;
            if (!Character.hasOwnProperty('spells')) return message.reply(findMessage('NO_SPELLS'));
            if (args.length === 0) {
                const Embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(findMessage('SPELLS_TITLE'))
                    .setDescription(findMessage('SPELLS_DESCRIPTION'))
                    .addField(ReplySpellList(createSpellList(Character)), '\u200B', true);
                return message.reply(Embed);
            }
            const Spell = getSpell({
                Character: Character,
                spell_name: args[0],
            });
            if (!Spell) return message.reply(findMessage('SPELL_UNKNOWN'));
            return message.reply(ReplySpell(Spell));
        });
    },
};

const ReplySpellList = (SpellList = []) => {
    if (!SpellList) return findMessage('NO_SPELLS');
    return `${SpellList.map(s => `${s.Name} (${s.Level})`).join('\n')}`;
};

const ReplySpell = (Spell = {}) => {
    if (!Spell) return;
    return `Deine Werte für ${Spell.Name} (${Spell.Level}) sind:

    ${Spell.Attributes.map(attribute => `${attribute.Name}: ${attribute.Level}`).join('   ')}
    `;
};

const createSpellList = (Character = {}) => {
    if (!Character || !Character.hasOwnProperty('spells')) return;
    let SpellList = [];
    Character.spells.forEach(spell =>
        SpellList.push(getSpell({ Character: Character, spell_name: spell.id }))
    );
    return SpellList.filter(value => value !== undefined); //?+
};
