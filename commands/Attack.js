const globals = require('../globals')
const db = globals.db
const Random = require('random')

module.exports = {
	name: 'attack',
	description: 'Würfelt den Attackewert auf eine Nahkampfwaffe.',
	aliases: ['angriff','attacke'],
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

					// Determining Both Attack and Ranged Attack Values.
					const CombatTechnique = globals.CombatTechniques.find(technique => technique.id === Weapon.combattechnique)
					let PlayerCombatTechnique = Player.combattechniques.find(technique => technique.id === CombatTechnique.id)
					let CombatTechniqueValue = null
					if (PlayerCombatTechnique) { CombatTechniqueValue = PlayerCombatTechnique.level }
					if(!CombatTechniqueValue) { CombatTechniqueValue = 6 }
					let Attribute
					let AttackValue = CombatTechniqueValue
					if (globals.MeleeWeapons.find(MeleeWeapon => MeleeWeapon.id === Weapon.id)) { 
						// For melee combat, MU is used for determining the Attack Value. Also, any weapon-based attack modifiers apply.
						Attribute = Player.attributes.find(a => a.id === 'mut').level
						AttackValue += Weapon.at_mod 
					}
					else {
						// For ranged combat, FF is used for determining Attack Value
						Attribute = Player.attributes.find(a => a.id === 'fingerfertigkeit').level
					}
					AttackValue += Math.floor((Attribute - 8)/3)

					let dice = []
					let Bonus = 0
					if(args[1] && !isNaN(parseInt(args[1]))) { Bonus = parseInt(args[1]) }
					let Comparison = Math.floor(AttackValue + Bonus)
					let CriticalHit = false
					let Patzer = false
					let Ok = false
					let DoubleDamage = false

					for (let i = 0; i < 2; i++) {
						dice.push(Random.int(1,20))
					}

					// If there is a cleaner way to do these checks, I'm all into it.
					if((dice[0] == 1) && dice[1] <= Comparison) 	 { CriticalHit = true; DoubleDamage = true; Ok = true }
					else if((dice[0] == 1) && dice[1] > Comparison)	 { CriticalHit = true; Ok = true }
					else if((dice[0] == 20) && dice[1] > Comparison) { Patzer = true }
					else if(dice[0] <= Comparison && !CriticalHit) 	 { Ok = true; dice.pop(); }
					else if(dice[0] > Comparison ) 					 { dice.pop(); }


					let Reply = 'Du greifst mit ' + globals.Declination[Weapon.article] + ' ' + Weapon.name + ' an.\n'
					Reply += 'Dein Angriffswert für ' + CombatTechnique.name + ' ist ' + Math.floor(((Attribute - 8)/3) + CombatTechniqueValue) + '. (KtW: ' + CombatTechniqueValue + ')\n'
					Reply += 'Deine 🎲: ` ' + dice.join(', ') + ' `.\n\n'

					if(!Ok) {
						Reply += globals.Replies.find(reply => reply.id === 'COMBAT_FAIL').string
						if(Patzer)			{ Reply += globals.Replies.find(reply => reply.id === 'COMBAT_CRIT_FAIL').string }
					}
					else {
						if(CriticalHit) 	{ Reply += globals.Replies.find(reply => reply.id === 'COMBAT_CRIT_SUCCESS').string }
						if(DoubleDamage) 	{ Reply += globals.Replies.find(reply => reply.id === 'COMBAT_DOUBLEDAMAGE').string }
						if(!CriticalHit) 	{ Reply += globals.Replies.find(reply => reply.id === 'COMBAT_SUCCESS').string }
						const DieModificator  = Weapon.diemodificator
						let Damage = DieModificator
						let DamageDice = []
						for (let i = 0; i < Weapon.dice; i++) {
							DamageDice.push(Random.int(1,6))
						}
						DamageDice.forEach(result => {
							Damage += result
						})
						if(DoubleDamage) { Damage *= 2 }

						Reply += '\n\nHier aufklappen, wenn der Gegner nicht parieren/Ausweichen konnte:\n'
						Reply += '||' + globals.Articles[Weapon.article] + ' ' + Weapon.name + ' (' + Weapon.dice + 'W6+' + Weapon.diemodificator +') erzielt ` ' + Damage + ' ` Schaden.'
						Reply += '\nDeine 🎲: ` ' + DamageDice.join(',') + ' `.||\n' 
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