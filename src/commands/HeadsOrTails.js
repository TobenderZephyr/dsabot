const globals = require('../globals');
const Random = require('random')
module.exports = async (message, args, db) => {
	Random.use(message.author.tag)
	const coin = Random.int(0,1)
	message.reply('Die Münze bleibt auf **' + globals.Coin[coin] + '** liegen.');
};