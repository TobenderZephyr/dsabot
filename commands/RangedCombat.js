const globals = require('../globals');
const db = globals.db;
const Random = require('random');
/*
        "meleeweapons": [{
            "amount": 1,
            "equipped": true,
            "handling": [],
            "ruleelement": {
                "id": "dolch",
                "type": "meleeweapon"
            }
        }, {
            "amount": 1,
            "equipped": true,
            "handling": [],
            "ruleelement": {
                "id": "waqqif",
                "type": "meleeweapon"
            }
        }],
*/
module.exports = {
	name: 'ranged',
	description: 'Würfelt den Attackewert auf eine Nahkampfwaffe.',
	aliases: ['fernkampf'],
	usage: '<Waffe>',
	needs_args: true,

	async exec(message, args) {
		try {
			db.find({
				user: message.author.tag,
			}, function(err, docs) {
				if (docs.length === 0) {
					return message.reply(globals.Replies.find(r => r.id === 'NOENTRY').string);
				}
				else {

					Random.use(message.author.tag);
					let dice = [];
					/*for (i in docs[0].character.skills) {
						if (docs[0].character.skills[i].id == args[0]) level = docs[0].character.skills[i].level;
					}
*/
					const Weapon = globals.MeleeWeapons.find(weapon => weapon.id === args[0]);
					if(!Weapon) { return message.reply(globals.Replies.find(r => r.id === 'NO_SUCH_WEAPON').string);}
					const DieModificator  = Weapon.diemodificator;
					let sum = DieModificator;
					for (let i = 0; i < Weapon.dice; i++) {
						dice.push(Random.int(1,6));
					}
					dice.forEach(result => {
						sum += result;
					});
					message.reply('Du schlägst mit ' + Weapon.name + ' zu. (' + Weapon.dice + 'W6+' + Weapon.diemodificator +')\nDeine 🎲: ' + dice.join(',') + '.\n' + 'Dein Angriff macht **' + sum + '** Schaden.');
				}
			});
		}
		catch (e) {
			throw e;
		}
	},
};