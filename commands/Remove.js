const { findMessage }= require('@dsabot/findMessage');
const globals = require('../globals');
const db = globals.db;
module.exports = {
	name: 'remove',
	description: 'Löscht deinen Charakter aus der Datenbank. Sinnvoll, wenn du mir eine neue zusenden möchtest.',
	aliases: [],
	usage: '',
	needs_args: false,
	async exec(message, args) {
		db.remove({
			user: message.author.tag,
		}, {}, function(err, numRemoved) {
			return message.reply(findMessage('DELETED_DATA'));
		});
	},
};