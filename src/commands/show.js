// eslint-disable-next-line no-unused-vars
module.exports = async (message, args, db) => {
  // eslint-disable-next-line no-undef
  db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
    message.reply('du hast: ' + row[0].GD + ' GD, ' + row[0].ST + ' ST, ' + row[0].BH + ' BH, ' + row[0].EK + ' EK.' );
  }
  );
};