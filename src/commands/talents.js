const globals = require('../globals')
module.exports = async (message, args, db) => {

    let reply = 'Diese Talentnamen kenne ich:\n```';

    for (let i in globals.Talente) {
        reply += '+ ' +globals.Talente[i].id + '\n'
    }
    reply += '```'
    message.author.send(
        reply
        );
};