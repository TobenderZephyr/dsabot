//const globals = require('../globals');
const globals = require('../globals');
const db = globals.db;
const { findMessage } = require('@dsabot/findMessage');
const { getChant } = require('@dsabot/getChant');
module.exports = {
    name: 'chants',
    description: 'Zeigt dir deinen Fertigkeitswert im jeweiligen Magietalent (Götterwirken).',
    aliases: ['chant', 'segen', 'liturgie'],
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
                            return message.reply(ReplyChantList(createChantList(Character))); //?+
                        } else {
                            const Spell = getChant({
                                Character: Character,
                                spell_name: args[0],
                            });
                            if (!Spell) {
                                return message.reply(findMessage('SPELL_UNKNOWN'));
                            }
                            return message.reply(ReplyChant(Spell));
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
const ReplyChantList = (ChantList = []) => {
    if (!ChantList) return;

    return `${ChantList.map(s => `${s.Name} (${s.Level})`).join('\n')}`;
};

const ReplyChant = (Chant = {}) => {
    if (!Chant) return;

    return `Deine Werte für ${Chant.Name} (${Chant.Level}) sind:
    ${Chant.Attributes.map(attribute => `${attribute.Name}: ${attribute.Level}`).join('   ')}
    `;
};

const createChantList = (Character = {}) => {
    if (!Character || !Character.hasOwnProperty('spells')) return;
    let ChantList = [];
    Character.spells.forEach(chant =>
        ChantList.push(getChant({ Character: Character, spell_name: chant.id }))
    );
    return ChantList.filter(value => value !== undefined); //?+
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
