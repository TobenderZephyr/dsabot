// eslint-disable-next-line no-unused-vars
module.exports = async (message, args, db) => {
	// eslint-disable-next-line no-undef
	try {
		console.log(message);
		db.find({
			user: message.author.tag,
		}, function(err, docs) {
			// docs is an array containing documents Mars, Earth, Jupiter If no document is
			// found, docs is equal to []
			if (!docs.length > 0) {message.reply('Sorry, Für dich habe ich keinen Eintrag 😥');}
			else {
				message.reply(
					`Du besitzt folgendes:
                            ${docs[0].silver} Silberstücke.`,
				);
			}
		});
	}
	catch (e) {
		throw e;
	}
};