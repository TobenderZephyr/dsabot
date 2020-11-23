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


	/*  db.query('SELECT * FROM dsageld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
    if(row && err) {
      message.reply('Es gab einen Fehler.');
    }
    if(row.length < 1) { //if the user is not in the database
      message.reply('Es existiert kein Eintrag für dich füge ihn mit !create hinzu.');
    } else if(row.length >= 1){
      message.reply('du hast: ' + row[0].GD + ' GD, ' + row[0].ST + ' ST, ' + row[0].BH + ' BH, ' + row[0].EK + ' EK.' + row[0].LP + ' LeP.');
    }
  }
  );*/
};