require('module-alias/register');
const { db } = require('../globals');
const { Werte } = require('../globals');

/*function getModifiers(Character = {}) {
    return {};
}
*/
function getStats(user) {
    const Attributes = [];
    user.character.attributes.forEach(attribute => {
        Attributes.push(getAttribute(attribute));
    });

    console.log(`getstats: ${Attributes}`);
    Attributes.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    //console.log(doHeading(Attributes));
    //console.log(listStats(Attributes));
    return Attributes;
}
function findUser(request) {
    return db.findOne({ user: request }, (error, document) => {
        console.log(document);
        return document;
    });
}
function doHeading(a) {
    return a.map(a => a.Short);
}
function listStats(a) {
    return a.map(a => a.Level);
}
function getAttribute(attribute_request = { id: 'mut', level: 9 }) {
    let Attribute = Werte.find(a => a.id === attribute_request.id);
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
    let Users = [];
    documents.forEach(document => {
        if (document) {
            Users.push({
                Name: document.user,
                Attributes: getStats(document),
            });
        }
    });
}
module.exports = {
    exec: (message, args) => {
        if (!args) return;
        if (args[0] === '--all') {
            return handleAll(args);
        }
        return handleArray(args);

        let Characters = []; //?+
        args.forEach(arg => {
            let user = findUser(arg);
            console.log(user);
            if (user) {
                Characters.push({
                    Name: arg,
                    Attributes: getStats(user),
                });
            }
        });
        //console.log(Characters[0].Attributes.map(a => a.Short));
        //console.log(Characters[0].Name); //?+
        console.log(Characters);
        return message.reply(Characters); //?+
    },
};

const l = require('./List');
const msg = { author: { tag: 'tagged!' }, reply: e => console.log(e) };
db.loadDatabase();
setTimeout(() => {
    l.exec(msg, ['tobenderzephyr#2509']);
}, 1500);
//l.exec(msg, ['tobenderzephyr#2509']); //?
//getStats('tobenderzephyr#2509'); //?+
