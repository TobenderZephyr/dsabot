const globals = require('../globals')
const db = globals.db
module.exports = {
	name: 'add',
	description: '',
	aliases: [],
	usage: '',
	needs_args: true,
	async exec(message, args) {
		try {
			console.log(message.author.tag + ': ' + args);
			if (!isNaN(args[0])) {
				message.reply(args[1]);
				console.log('1: ' + args[1] + ', 2: ' + args[2]);
				const money = ['gold', 'silver', 'bronce', 'iron', 'hp'];
				db.find({
					user: message.author.tag,
				}, function(err, docs) {

					gold = docs[0].gold;
					silver = docs[0].silver;
					bronce = docs[0].bronce;
					iron = docs[0].iron;
					hp = docs[0].hp;

				});
				db.update({
					user: message.author.tag,
				}, {
					gold: gold,
					silver: silver,
					bronce: bronce,
					iron: iron,
					hp: hp,
				}, function(err, docs) {
					if (!docs.length > 0) {
						message.reply('Sorry, Für dich habe ich keinen Eintrag 😥');
						return;
					}
					message.reply(`ich habe ${args[2]} zu ${args[1]} hinzugefügt.`);
				});
			}
		}
		catch (e) {
			throw e;
		}
	},
};