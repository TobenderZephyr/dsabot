module.exports = async (message, args, db) => {
    try {
      console.log(message.author.tag + ': ' + args)
        if (!isNaN(args[0])) {
          message.reply(args[1])
          console.log('1: ' + args[1] + ', 2: ' + args[2])
            const money = ["gold", "silver", "bronce", "iron", "hp"]
            if (money.indexOf(args[1].toLowerCase()) < 0) {
                message.reply(
                    'Sorry, Aber du musst eins der folgenden Wörter angeben: ' + money.join(",")
                )
                return;
            }
            db.find({
                user: message.author.tag
            }, function (err, docs) {

                gold = docs[0].gold
                silver = docs[0].silver
                bronce = docs[0].bronce
                iron = docs[0].iron
                hp = docs[0].hp

            })
            db.update({
                user: message.author.tag
            }, {
                gold: gold,
                silver: silver,
                bronce: bronce,
                iron: iron,
                hp: hp
            }, function (err, docs) {
                if (!docs.length > 0) {
                    message.reply('Sorry, Für dich habe ich keinen Eintrag 😥')
                    return;
                }
                message.reply(`ich habe ${args[2]} zu ${args[1]} hinzugefügt.`)
            })
        }
    } catch (e) {
        throw e
    }
}

/*
module.exports = async (message, args, db) => {
  var n;

  if(!isNaN(args[0]) && (args[1] === 'GD' || args[1] === 'ST' || args[1] === 'BH' || args[1] === 'EK')) {
    // eslint-disable-next-line no-undef
    db.query('SELECT * FROM dsageld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
      if(row && err) {
        message.reply('Es gab einen Fehler.');
      }
      if(typeof(row) == 'undefined') { //if the user is not in the database
        message.reply('Es existiert kein Eintrag für dich füge ihn mit !create hinzu.');
      } else { //if the user is in the database
        if(args[1] === 'GD') {
          n = parseInt(row[0].GD, 10) + parseInt(args[0], 10);
        } else if(args[1] === 'ST') {
          n = parseInt(row[0].ST, 10) + parseInt(args[0], 10);
        } else if(args[1] === 'BH') {
          n = parseInt(row[0].BH, 10) + parseInt(args[0], 10);
        } else if(args[1] === 'EK') {
          n = parseInt(row[0].EK, 10) + parseInt(args[0], 10);
        } else if(args[1] === 'LP') {
          n = parseInt(row[0].EK, 10) + parseInt(args[0], 10);
        }
        // eslint-disable-next-line no-undef
        db.query('UPDATE dsageld SET' + '`' + args[1] + '`' + ' = (' + n + ') WHERE userName = ' + '"' + message.author.tag + '"');
        // eslint-disable-next-line no-undef
        db.query('SELECT * FROM dsageld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
          message.reply(args[0] + args[1] + ' hinzugefügt, du hast: ' + row[0].GD + 'GD, ' + row[0].ST + 'ST, ' + row[0].BH + 'BH, ' + row[0].EK + 'EK, ' + row[0].LP + 'LeP.');
        });
      }
    });
  }
};
*/