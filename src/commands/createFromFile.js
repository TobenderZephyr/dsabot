module.exports = async (message, data, db) => {
  try {
    console.log(message.channel)
    db.find({
      user: message.author.tag
    }, function (err, docs) {
      if (!docs.length > 0)
        db.insert({
          user: message.author.tag,
          gold: 0,
          silver: 0,
          bronce: 0,
          iron: 0,
          hp: 0,
          character: data
        }, function (err, docs) {
          message.reply('Ich habe deine Daten abgespeichert.')
          //console.log(docs[0].character.name)
        })
    });
  } catch (e) {
    throw e
  }
}