require('module-alias/register');
const { findMessage } = require('@dsabot/findMessage');
const { isEmpty } = require('@dsabot/isEmpty');
const { db } = require('../globals');
const { Werte } = require('../globals');

function printHeader(attributes) {
    if (!attributes) return null;
    return `${''.padStart(31)}${attributes
        .map(a => `${a.Short}`.padEnd(4).padStart(6))
        .join('|')}\n`.toString();
}
function listStats(attributes) {
    return `${attributes.map(a => `${a.Level}`.padEnd(4).padStart(6)).join('|')}\n`;
}
function getAttribute(attribute_request = { id: 'mut', level: 9 }) {
    const Attribute = Werte.find(a => a.id === attribute_request.id);
    return {
        id: Attribute.id,
        Name: Attribute.name,
        Short: Attribute.kuerzel,
        Level: attribute_request.level,
    };
}

function getStats(user) {
    const Attributes = [];
    user.character.attributes.forEach(attribute => {
        Attributes.push(getAttribute(attribute));
    });
    Attributes.sort((a, b) => (a.id > b.id ? 1 : -1));
    return Attributes;
}

function returnResult(message, Characters) {
    if (isEmpty(Characters)) return message.reply(findMessage('NO_CHARACTERS'));

    Characters.sort((a, b) => (a.Name > b.Name ? 1 : -1));
    let Reply = `\`\`\`\n${printHeader(Characters[0].Attributes)}`;

    Characters.forEach(c => {
        Reply += `${c.Name.toString().padEnd(30)} ${listStats(c.Attributes)}`;
    });

    Reply += `\`\`\``;
    return message.reply(Reply);
}

async function findUser(request = '') {
    return db
        .findOne({
            $or: [
                { user: request.replace('@', '') },
                { uid: request.replaceAll(/[<>!@]/gi, '') },
                { character: { name: request } },
            ],
        })
        .then(doc => doc);
}

async function findUsers(message) {
    const Characters = [];

    db.find({})
        .limit(10)
        .then(users => {
            users.forEach(user => {
                Characters.push({
                    Name: user.character.name,
                    Attributes: getStats(user),
                });
            });
        })
        .then(() => returnResult(message, Characters));
}

module.exports = {
    name: 'list',
    description: 'Gibt eine Liste von Mitspielern aus.',
    aliases: ['liste'],
    usage: '[@Mention / Benutzername]',
    needs_args: false,

    exec: async (message, args) => {
        if (!args) return null;
        if (args[0] === '--all') {
            return findUsers(message);
        }
        const Characters = []; //?+
        Promise.all(
            args
                .map(arg => findUser(arg))
                .then(user => {
                    if (!isEmpty(user)) {
                        Characters.push({
                            Name: user.character.name,
                            Attributes: getStats(user),
                        });
                    }
                })
        ).then(() => returnResult(message, Characters));
        return null;
    },
};
/*
(async () => {
    db.loadDatabase();

    const l = require('./List');
    const msg = { author: { tag: 'tagged!' }, reply: e => console.log(e) };

    l.exec(msg, ['tobenderzephyr#2509', 'ElManu#8438']);
})();
*/
