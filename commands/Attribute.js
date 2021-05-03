require('module-alias/register');

const { db } = require('../globals');
const { Werte } = require('../globals');
const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');
const { CompareResults } = require('@dsabot/CompareResults');

function handleAttributeCheck(doc, { message, args }) {
    if (Object.keys(doc).length === 0) {
        return message.reply(findMessage('NOENTRY'));
    }
    let Attribute = isNaN(args[0])
        ? HandleNamedAttributes({ Character: doc.character, args: args })
        : null;
    let Level = Attribute ? Attribute.Level : args[0] || 8;
    let Bonus = parseInt(args[1]) || 0;
    let dice = roll(2, 20, message.author.tag).dice;
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

function HandleNamedAttributes({ Character: Character = {}, args: args = [] } = {}) {
    let Attribute = getAttribute(args[0]);
    let Level = getAttributeLevel(Character, Attribute) || 8;

    return {
        Name: Attribute.name,
        Level: Level,
    };
}

function getAttributeLevel(Character = {}, Attribute = {}) {
    return Character.attributes.find(attribute => attribute.id === Attribute.id).level;
}

function getAttribute(attribute = '') {
    return attribute.length === 2
        ? Werte.find(a => a.kuerzel === attribute.toUpperCase())
        : Werte.find(a => a.name.toLowerCase() === attribute.toLowerCase());
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
