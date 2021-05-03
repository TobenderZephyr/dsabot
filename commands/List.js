require('module-alias/register');
const { db } = require('../globals');
const { Werte } = require('../globals');

function isEmpty(document = {}) {
    return Object.keys(document).length === 0 ? true : false;
}
function getStats(user) {
    const Attributes = [];
    user.character.attributes.forEach(attribute => {
        Attributes.push(getAttribute(attribute));
    });

    Attributes.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    // console.log(doHeading(Attributes));
    // console.log(listStats(Attributes));
    return Attributes;
}
async function findUser(request = '') {
    return db.findOne({ user: request }).then(doc => doc);
}
function doHeading(a) {
    return a.map(a => a.Short);
}
function listStats(a) {
    return a.map(a => a.Level);
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

function handleArray(request) {
    db.find({ user: { $in: request } }, (error, documents) => handleDocuments(documents));
}

function handleAll(args) {
    db.find({}, (error, documents) => handleDocuments(documents));
}
function handleDocuments(documents) {
    const Users = [];
    documents.forEach(document => {
        if (document) {
            Users.push({
                Name: document.user,
                Attributes: getStats(document),
            });
        }
    });
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
    ).then(() => console.log(Characters));
};

(async () => {
    db.loadDatabase();

    const l = require('./List');
    const msg = { author: { tag: 'tagged!' }, reply: e => console.log(e) };

    l.exec(msg, ['tobenderzephyr#2509', 'ElManu#8438']);
})();
