const { findMessage } = require('@dsabot/findMessage');
const { db } = require('../globals');

module.exports = {
    name: 'remove',
    description:
        'Löscht deinen Charakter aus der Datenbank. Sinnvoll, wenn du mir eine neue zusenden möchtest.',
    aliases: [],
    usage: '',
    needs_args: false,
    // eslint-disable-next-line no-unused-vars
    async exec(message) {
        db.remove({ user: message.author.tag })
            .then(() => message.reply(findMessage('DELETED_DATA')))
            .catch(err => {
                message.reply(findMessage('ERROR'));
                throw new Error(err);
            });
    },
};
