const globals = require('../globals')
const db = globals.db
const Random = require('random')

module.exports = {
	name: 'parry',
	description: 'Würfelt den Paradewert auf eine Nahkampfwaffe.',
	aliases: ['parieren','parade'],
	usage: '<Waffe>',
	needs_args: true,

	async exec(message, args) {
		try {
			db.find({
				user: message.author.tag,
			}, function(err, docs) {
				if (!docs.length > 0) {
					return message.reply(globals.Replies.find(r => r.id === 'NOENTRY').string);
				}
				else {

					Random.use(message.author.tag);

					const Player = docs[0].character
					const Weapon = globals.Weapons.find(w => w.id === args[0].toLowerCase())
					if(!Weapon) { return message.reply(globals.Replies.find(r => r.id === 'NO_SUCH_WEAPON').string)}

					if(!globals.MeleeWeapons.find(MeleeWeapon => MeleeWeapon.id === Weapon.id)) {
						return message.reply(globals.Replies.find(r => r.id === 'PARRY_WRONG_WEAPON').string)
					}
					const CombatTechnique = globals.CombatTechniques.find(technique => technique.id === Weapon.combattechnique)
					let PlayerCombatTechnique = Player.combattechniques.find(technique => technique.id === CombatTechnique.id)
					let CombatTechniqueValue = null
					if (PlayerCombatTechnique) { CombatTechniqueValue = PlayerCombatTechnique.level }
					if(!CombatTechniqueValue) { CombatTechniqueValue = 6 }

					let ParryValue = Math.ceil(CombatTechniqueValue/2)
					for (let i in CombatTechnique.Leiteigenschaft) {
						let Attribute = globals.Werte.find(a => a.kuerzel === CombatTechnique.Leiteigenschaft[i]).id
						ParryValue += Math.floor((Player.attributes.find(a => a.id === Attribute).level - 8)/3)
					}
					ParryValue += Weapon.pa_mod 

					let dice = []
					let Bonus = 0
					if(args[1] && !isNaN(parseInt(args[1]))) { Bonus = parseInt(args[1]) }
					let Comparison = Math.floor(ParryValue + Bonus)
					let Patzer = false
					let Critical = false
					let Ok = false

					for (let i = 0; i < 2; i++) {
						dice.push(Random.int(1,20))
					}

					// If there is a cleaner way to do these checks, I'm all into it.
					if((dice[0] == 1) && dice[1] <= Comparison) 	 { Critical = true; Ok = true }
					else if(dice[0] <= Comparison && !Critical) 	 { Ok = true; dice.pop(); }
					else if((dice[0] == 20) && dice[1] > Comparison) { Patzer = true }
					else if(dice[0] > Comparison ) 					 { dice.pop(); }


					let Reply = 'Du versuchst, mit ' + globals.Declination[Weapon.article] + ' ' + Weapon.name + ' zu parieren.\n'
					Reply += 'Dein Paradewert für ' + CombatTechnique.name + ' ist ' + Math.floor(ParryValue - Weapon.pa_mod) + '. (Waffe: ' + Weapon.pa_mod + ')\n'
					Reply += 'Deine 🎲: ` ' + dice.join(', ') + ' `.\n\n'

					if(!Ok) {
						Reply += globals.Replies.find(reply => reply.id === 'PARRY_FAIL').string
						if(Patzer)			{ Reply += globals.Replies.find(reply => reply.id === 'PARRY_CRIT_FAIL').string }
					}
					else {
						if(Critical) 	{ Reply += globals.Replies.find(reply => reply.id === 'PARRY_CRIT_SUCCESS').string }
						if(!Critical) 	{ Reply += globals.Replies.find(reply => reply.id === 'PARRY_SUCCESS').string }
					}

					return message.reply( Reply )

				}
			});
		}
		catch (e) {
			throw e;
		}
	},
};