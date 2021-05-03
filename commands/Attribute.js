require('module-alias/register');
const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');
const { CompareResults } = require('@dsabot/CompareResults');
const { isEmpty } = require('@dsabot/isEmpty');
const { isString } = require('@dsabot/isString');
const { db } = require('../globals');
const { Werte } = require('../globals');

function getAttributeLevel(Character = {}, Attribute = {}) {
    return Character.attributes.find(attribute => attribute.id === Attribute.id).level;
}

function getAttribute(attribute = '') {
    return attribute.length === 2
        ? Werte.find(a => a.kuerzel === attribute.toUpperCase())
        : Werte.find(a => a.name.toLowerCase() === attribute.toLowerCase());
}
function HandleNamedAttributes({ Character = {}, args = [] } = {}) {
    const Attribute = getAttribute(args[0]);
    const Level = getAttributeLevel(Character, Attribute) || 8;

    return {
        Name: Attribute.name,
        Level,
    };
}

function handleAttributeCheck(doc, { message, args }) {
    if (isEmpty(doc)) {
        return message.reply(findMessage('NOENTRY'));
    }
    const Attribute = isString(args[0])
        ? HandleNamedAttributes({ Character: doc.character, args: args })
        : null;
    const Level = Attribute ? Attribute.Level : args[0] || 8;
    const Bonus = parseInt(args[1], 10) || 0;
    const { dice } = roll(2, 20, message.author.tag);
    const Result = CompareResults(dice, [Level, Level], Bonus);

    // handle crits
    if (Result.CriticalHit === 2) {
        return message.reply(
            `${findMessage('TITLE_CRIT_SUCCESS')}\n${findMessage('MSG_CRIT_SUCCESS')}`
        );
    }
    if (Result.Fumbles === 2) {
        return message.reply(
            `${findMessage('TITLE_CRIT_FAILURE')}\n${findMessage('MSG_CRIT_FAILURE')}`
        );
    }

    // every
    if (dice[0] + Bonus > Level) {
        return message.reply(
            `Du hast die Probe (Stufe ${Level}) leider nicht bestanden 😢.\nDeine 🎲: ${dice[0]} ${
                Bonus ? `+${Bonus}` : ''
            }`
        );
    }
    if (Attribute) {
        return message.reply(
            `Du hast die Probe auf ${Attribute.Name} (Stufe ${
                Attribute.Level
            }) bestanden. Deine 🎲: ${dice[0]} ${Bonus ? `+${Bonus}` : ''}`
        );
    }

    return message.reply(
        `Du hast die Probe (Stufe ${Level}) bestanden. Deine 🎲: ${dice[0]} ${
            Bonus ? `+${Bonus}` : ''
        }`
    );
}
module.exports = {
    name: 'attribute',
    description: '',
    aliases: ['ap', 'ep'],
    usage: '<Eigenschaft> / <Eigenschaftswert>',
    needs_args: true,
    async exec(message, args) {
        db.findOne({ user: message.author.tag })
            .then(doc => handleAttributeCheck(doc, { message, args }))
            .catch(err => {
                message.reply(findMessage('ERROR'));
                throw new Error(err);
            });
    },
};
