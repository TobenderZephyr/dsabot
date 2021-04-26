//const globals = require('../globals');
const globals = require('../globals');
const db = globals.db;
const { findMessage } = require('@dsabot/findMessage');
const { getSpell } = require('@dsabot/getSpell');
module.exports = {
    name: 'spells',
    description: 'Zeigt dir deinen Fertigkeitswert im jeweiligen Magietalent.',
    aliases: ['spell', 'zauber'],
    usage: '<Zauber>',
    needs_args: true,

    async exec(message, args) {
        try {
            console.log(message.author.tag);
            db.find(
                {
                    user: message.author.tag,
                },
                function (err, docs) {
                    if (docs.length === 0) {
                        return message.reply(findMessage('NOENTRY'));
                    } else {
                        Character = docs[0].character;
                        if (args.length === 0) {
                            //console.log(ReplySpellList(createSpellList(Character)));
                            return message.reply(ReplySpellList(createSpellList(Character))); //?+
                        } else {
                            const Spell = getSpell({
                                Character: Character,
                                spell_name: args[0],
                            });
                            if (!Spell) {
                                return message.reply(findMessage('SPELL_UNKNOWN'));
                            }
                            return message.reply(ReplySpell(Spell));
                            //    `Du hast folgenden Wert in **${Spell.Name}**: ${Spell.Level}`
                            //);
                        }
                    }
                }
            );
        } catch (e) {
            throw e;
        }
    },
};
const ReplySpellList = (SpellList = []) => {
    if (!SpellList) return;

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

const s = require('./Spells');
const user = 'hmpf1992#1074';
//const user = 'Jens#5449';
const message = {
    author: {
        tag: user,
    },
    reply: function (e) {
        console.log(e);
    },
};
const args = ['armatrutz'];
s.exec(message, args);

const createChantList = (Character = {}) => {
    if (!Character || !Character.hasOwnProperty('chants')) return;
    let ChantList = [];
    Character.chants.forEach(chant =>
        ChantList.push(getChant({ Character: Character, spell_name: chant.id }))
    );
    return ChantList.filter(value => value !== undefined); //?+
};
