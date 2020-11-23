// eslint-disable-next-line no-unused-vars
module.exports = async (message, args, db) => {
	if (args.length < 3) {
		message.reply('Der Talentwurf funktioniert so:\n' +
        '!tp Eigenschaftswert1 Eigenschaftswert2 Eigenschaftswert3 [Bonus] [Erschwernis]');
	}
	else {
		const roll = [];
		if (args[3]) {
			var bonus = parseInt(args[3]);
		}
		else {
			bonus = 0;
		}
		if (args[4]) {
			var erschwernis = parseInt(args[4]);
		}
		else {
			erschwernis = 0;
		}
		for (i = 1; i <= 3; i++) {
			const a = Math.floor(Math.random() * 20 + 1);
			roll.push(a);
		}
		let ok = 0;
		let patzer = 0;
		let crit = 0;
		for (i = 0; i < 3; i++) {
			if (Math.floor(parseInt(args[i]) + parseInt(erschwernis)) >= roll[i]) {ok++;}
			else if (
				Math.floor(parseInt(args[i]) + parseInt(bonus) + parseInt(erschwernis)) >= roll[i]) {
				ok++;
				bonus = bonus - (roll[i] - parseInt(erschwernis) - parseInt(args[i]));
			}
			if (roll[i] == 1) crit++;
			if (roll[i] == 20) patzer++;
		}
		if (patzer >= 2) {
			message.reply(
				'Deine 🎲: ' + roll.join(', ') + '. Patzer! Du hast aber auch Pech 😥',
			);
		}
		else if (crit >= 2) {
			message.reply(
				'Deine 🎲: ' + roll.join(', ') + '. Damit hast du einen kritischen Erfolg erzielt 🎈✨🥳',
			);
		}
		else if (ok < 3) {
			message.reply(
				'Deine 🎲: ' + roll.join(', ') + '. Damit hast du nur ' + ok + '/3 Proben bestanden. 😪',
			);
		}
		else {
			message.reply(
				'Das waren deine 🎲: ' + roll.join(', ') + '. Damit hast du ' + ok + '/3 Proben bestanden. Dein Bonus: ' + bonus + '/' + args[3] + '.',
			);
		}
	}
};
