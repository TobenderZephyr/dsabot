const { findMessage } = require('@dsabot/findMessage');
const globals = require('../globals');
const db = globals.db;
module.exports = {
    name: 'remove',
    description:
        'Löscht deinen Charakter aus der Datenbank. Sinnvoll, wenn du mir eine neue zusenden möchtest.',
    aliases: [],
    usage: '',
    needs_args: false,
    // eslint-disable-next-line no-unused-vars
    async exec(message, args) {
        db.remove({ user: message.author.tag }, err => {
            if (err) {
                message.reply(findMessage('ERROR'));
                throw new Error(err);
            }
            return message.reply(findMessage('DELETED_DATA'));
        });
    },
};
