require('module-alias/register');
const { db } = require('../globals');
const { Werte } = require('../globals');

function isEmpty(document = {}) {
    return Object.keys(document).length === 0 ? true : false;
}

async function findUser(request = '') {
    return db.findOne({ user: request }).then(doc => doc);
}
function doHeading(attributes) {
    return `${''.padStart(25)}${attributes
        .map(a => `${a.Short}`.padEnd(4).padStart(6))
        .join('|')}\n`;
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
    Attributes.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    return Attributes;
}

module.exports.exec = async function exec(message, args) {
    if (!args) return;
    const Characters = []; //?+
    Promise.all(
        args.map(arg => {
            return findUser(arg).then(user => {
                if (!isEmpty(user)) {
                    Characters.push({
                        Name: arg,
                        Attributes: getStats(user),
                    });
                }
            });
        })
    ).then(() => {
        //console.log(Characters)
        let Reply = `\`\`\`\n${doHeading(Characters[0].Attributes)}`;
        Characters.forEach(c => {
            Reply += `${c.Name.toString().padEnd(24)} ${listStats(c.Attributes)}`;
        });
        Reply += `\`\`\``;
        message.reply(Reply);
    });
};
/*
(async () => {
    db.loadDatabase();

    const l = require('./List');
    const msg = { author: { tag: 'tagged!' }, reply: e => console.log(e) };

    l.exec(msg, ['tobenderzephyr#2509', 'ElManu#8438']);
})();
*/
