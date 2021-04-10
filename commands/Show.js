// eslint-disable-next-line no-unused-vars
const globals = require('../globals');
const Discord = require('discord.js');
const db = globals.db;
const { findMessage }= require('@dsabot/findMessage');

module.exports = {
	name: 'show',
	description: '',
	aliases: [],
	usage: '',
	needs_args: false,

	async exec(message, args) {
		try {
			db.find({
				user: message.author.tag,
			}, function(err, docs) {
				if (docs.length === 0) {
					return message.reply(findMessage('NOENTRY'));
				}
				else {
					let gender;
					if (docs[0].character.sex == 'female') { gender = '♀️'; }
					else { gender = '♂️'; }
					const Reply = new Discord.MessageEmbed();
					Reply.setColor('#0099ff');
					Reply.setTitle(gender + ' ' + docs[0].character.name);
					Reply.setDescription(docs[0].character.age + ' Jahre, ' + docs[0].character.race + '/' + docs[0].character.culture);
					Reply.addField(docs[0].character.professionname, docs[0].character.xp.startinglevel);
					
					message.reply( Reply );
				}
			});
		}
		catch (e) {
			throw e;
		}
	},
};