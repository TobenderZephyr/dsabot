// eslint-disable-next-line no-unused-vars
module.exports = async (message, args, db) => {
	if (!args.length == 3) {
		message.reply('Du hast die Würfel nicht korrekt angegeben.');
	}

	else if(!isNaN(args[0]) && !isNaN(args[2]) && args[0] > 0 && args[2] > 0) {
		const roll = [];
		for (let i = 0; i < args[0]; i++) {
			const a = Math.floor(Math.random() * args[2]) + 1;
			roll.push(a);
		}
		message.reply('Deine Würfe(' + args[0] + 'W' + args[2] + '): ' + roll.join(', ') + '.');
	}
	else {
		message.reply('Du hast die Würfel nicht korrekt angegeben.');
	}
};