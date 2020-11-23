module.exports = async (message, args, db) => {
	try {
		db.find({
			user: message.author.tag,
		}, function(err, docs) {
			if (!docs.length > 0) {message.reply('Sorry, Für dich habe ich keinen Eintrag 😥');}
			else {
				let level = 0;
				for(i in docs[0].character.skills) {
					if(docs[0].character.skills[i].id == args[0]) level = docs[0].character.skills[i].level;
				}
				message.reply('Du hast Folgenden Skill in ' + args[0] + ': ' + level);
			}
		});
	}
	catch (e) {
		throw e;
	}
};