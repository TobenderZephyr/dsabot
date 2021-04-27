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
        console.log(message.author.tag);
        db.find({ user: message.author.tag }, (err, docs) => {
            if (docs.length === 0) {
                return message.reply(findMessage('NOENTRY'));
            }
            Character = docs[0].character;
            if (args.length === 0) {
                return message.reply(ReplyChantList(createChantList(Character))); //?+
            }
            const Spell = getChant({
                Character: Character,
                chant_name: args[0],
            });
            if (!Spell) {
                return message.reply(findMessage('SPELL_UNKNOWN'));
            }
            return message.reply(ReplyChant(Spell));
        });
    },
};

const createChantList = (Character = {}) => {
    if (!Character || !Character.hasOwnProperty('chants')) return;
    let ChantList = [];

    // todo: send 'chant' to getChant() so we can filter out blessings.
    Character.chants.forEach(chant => ChantList.push(getChant({ Character: Character, chant_name: chant.id })));
    return ChantList.filter(value => value !== undefined); //?+
};

const ReplyChantList = (ChantList = []) => {
    if (!ChantList) return;
    return `${ChantList.map(chant => `${chant.name} ${chant.level ? `(${chant.level})` : ''}`).join('\n')}`;
};

const ReplyChant = (Chant = {}) => {
    if (!Chant) return;
    return `Deine Werte für ${Chant.name} ${Chant.level ? '(' + Chant.level + ')' : ''} sind:

    ${Chant.Attributes.map(attribute => `${attribute.Name}: ${attribute.Level}`).join('   ')}
    `;
};
