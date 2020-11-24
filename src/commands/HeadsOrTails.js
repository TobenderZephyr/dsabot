const globals = require('../globals')
module.exports = async (message, args, db) => {
	let coin = Math.floor(Math.random()*2)
	message.reply('Folgende Seite hat der Münzwurf ergeben: ' + globals.Coin[coin] + '.')
};