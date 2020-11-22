module.exports = async (message, data, db) => {
  try {
      db.find({
          user: message.author.tag
      }, function (err, docs) {
          // docs is an array containing documents Mars, Earth, Jupiter If no document is
          // found, docs is equal to []
          if(!docs.length>0)
              db.insert({user: message.author.tag,
              gold: 0,
            silver: 0,
            bronce: 0,
            iron: 0,
            hp: 0,
            character: data
          
          })

          console.log(docs)
      });
  } catch (e) {
      throw e
  }
}
 
 
  // eslint-disable-next-line no-undef
  /*db.query('SELECT * FROM dsageld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
    if(row.length < 1) {
      // eslint-disable-next-line no-undef
      db.query('INSERT INTO `dsageld` (`userName`, `GD`,`ST`, `BH`, `EK`, `LP`) VALUES (' + '"' + message.author.tag + '"' + ', 0, 0, 0, 0, 0)');
      message.reply('Dein Eintrag wurde registriert.');
    } else if(row.length >= 1) {
      message.reply('Dein Eintrag existiert bereits.');
    }
  });
};*/