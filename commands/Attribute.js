const globals = require('../globals');
const { CountOccurences } = require('@dsabot/CountOccurences');
const Random = require('random');
const db = globals.db;

module.exports = {
    name: 'attribute',
    description: '',
    aliases: ['ap', 'ep'],
    usage: '<Eigenschaft> / <Eigenschaftswert>',
    needs_args: true,
    async exec(message, args) {
        let Attribute;
        let AttributeName;
        let Level = 8;
        await db.find(
            {
                user: message.author.tag,
            },
            async (err, docs) => {
                // user calls with text, let's look him up in the database.
                if (isNaN(args[0])) {
                    Attribute = HandleNamedAttributes({
                        Character: docs[0].character,
                        args: args,
                    });
                    AttributeName = Attribute.Name;
                    Level = Attribute.Level;
                } else {
                    Level = args[0];
                }
                Random.use(message.author.tag);

                const dice = [];
                dice.push(Random.int(1, 20));
                if (dice[0] === 1 || dice[0] === 20) {
                    dice.push(Random.int(1, 20));
                }
                // handle crits
                if (CountOccurences(dice, 1) === 2) {
                    message.reply(
                        `Du hast einen kritischen Erfolg erzielt (${dice.join(', ')})! 🎉🥳🎆`
                    );
                    return;
                } else if (CountOccurences(dice, 20) === 2) {
                    message.reply(
                        'Du hast einen Patzer (' +
                            dice.join(', ') +
                            ')! 😭 Viel Erfolg beim nächsten mal!'
                    );
                    return;
                }
                if (
                    (dice.length == 2 && dice[0] != 20 && dice[1] <= Level) ||
                    (dice.length == 1 && dice[0] <= Level)
                ) {
                    if (AttributeName) {
                        message.reply(
                            'Du hast die Probe auf ' +
                                AttributeName +
                                ' (Stufe ' +
                                Level +
                                ') bestanden.\n' +
                                'Deine 🎲: ' +
                                dice.join(', ')
                        );
                    } else {
                        message.reply(
                            'Du hast die Probe (Stufe ' +
                                Level +
                                ') bestanden.\n' +
                                'Deine 🎲: ' +
                                dice.join(', ')
                        );
                    }
                } else if (AttributeName) {
                    message.reply(
                        'Du hast die Probe auf ' +
                            AttributeName +
                            ' (Stufe ' +
                            Level +
                            ') leider nicht bestanden 😢.\n' +
                            'Deine 🎲: ' +
                            dice.join(', ')
                    );
                } else {
                    message.reply(
                        `Du hast die Probe (Stufe ${Level}) leider nicht bestanden 😢.\nDeine 🎲: ${dice.join(
                            ', '
                        )}`
                    );
                }
            }
        );
    },
};

function HandleNamedAttributes({ Character: Character = [], args: args = [] } = {}) {
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
        ? globals.Werte.find(a => a.kuerzel === attribute.toUpperCase())
        : globals.Werte.find(a => a.name.toLowerCase() === attribute.toLowerCase());
}
