module.exports = async (message, args, db) => {
	db.remove({ user: message.author.tag }, {}, function (err, numRemoved) {
		message.reply('Ich habe deine Daten gelöscht.\n'+
		"Wenn dir danach ist, kannst du mir gerne wieder eine neue Datei zusenden.")
	  });
};