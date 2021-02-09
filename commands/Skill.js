const globals = require('../globals');
const db = globals.db;
module.exports = {
	name: 'skill',
	description: 'Zeigt dir deinen Fertigkeitswert im jeweiligen Talent.',
	aliases: [],
	usage: '<Fertigkeit>',
	needs_args: true,

	async exec(message, args) {
		try {
			db.find({
				user: message.author.tag,
			}, function(err, docs) {
				if (docs.length === 0) {
					return message.reply(globals.Replies.find(r => r.id === 'NOENTRY').string);
				}
				else {
					let level = 0;
					for (let i in docs[0].character.skills) {
						if (docs[0].character.skills[i].id == args[0]) level = docs[0].character.skills[i].level;
					}
					message.reply('Du hast folgenden Talentwert in ' + args[0] + ': ' + level);
				}
			});
		}
		catch (e) {
			throw e;
		}
	},
};