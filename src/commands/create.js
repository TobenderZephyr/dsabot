module.exports = async (message, args, db) => {
  // eslint-disable-next-line no-undef
  db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
    if(row.length < 1) {
      // eslint-disable-next-line no-undef
      db.query('INSERT INTO `DSAGeld` (`userName`, `GD`,`ST`, `BH`, `EK`) VALUES (' + '"' + message.author.tag + '"' + ', 0, 0, 0, 0)');
      message.reply('Dein Eintrag wurde registriert.');
    } else if(row) {
      message.reply('Dein Eintrag existiert bereits.');
    }
  });
};