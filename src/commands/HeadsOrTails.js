const globals = require('../globals');
module.exports = async (message, args, db) => {
	const coin = Math.floor(Math.random() * 2);
	message.reply('Die Münze bleibt auf **' + globals.Coin[coin] + '** liegen.');
};