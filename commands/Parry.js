const { findMessage } = require('@dsabot/findMessage');
const { isEmpty } = require('@dsabot/isEmpty');
const { Random } = require('@dsabot/Random');
const { db } = require('../globals');
const { Werte } = require('../globals');
const { Weapons } = require('../globals');
const { CombatTechniques } = require('../globals');
const { MeleeWeapons } = require('../globals');

module.exports = {
    name: 'parry',
    description: 'Würfelt den Paradewert auf eine Nahkampfwaffe.',
    aliases: ['parieren', 'parade'],
    usage: '<Waffe>',
    needs_args: true,

    async exec(message, args) {
        db.find({ user: message.author.tag }).then(docs => {
            if (isEmpty(docs)) {
                return message.reply(findMessage('NOENTRY'));
            }

            const Player = docs[0].character;
            const Weapon = Weapons.find(w => w.id === args[0].toLowerCase());
            if (!Weapon) {
                return message.reply(findMessage('NO_SUCH_WEAPON'));
            }

            if (!MeleeWeapons.find(MeleeWeapon => MeleeWeapon.id === Weapon.id)) {
                return message.reply(findMessage('PARRY_WRONG_WEAPON'));
            }
            const CombatTechnique = CombatTechniques.find(
                technique => technique.id === Weapon.combattechnique
            );
            const PlayerCombatTechnique = Player.combattechniques.find(
                technique => technique.id === CombatTechnique.id
            );
            let CombatTechniqueValue = null;
            if (PlayerCombatTechnique) {
                CombatTechniqueValue = PlayerCombatTechnique.level;
            }
            if (!CombatTechniqueValue) {
                CombatTechniqueValue = 6;
            }

            let ParryValue = Math.ceil(CombatTechniqueValue / 2);
            CombatTechniqueValue.Leiteigenschaft.forEach(Property => {
                const Attribute = Werte.find(a => a.kuerzel === Property.id);
                ParryValue += Math.floor(
                    (Player.attributes.find(a => a.id === Attribute).level - 8) / 3
                );
            });
            ParryValue += Weapon.pa_mod;

            const dice = [];

            const Bonus = parseInt(args[1], 10) || 0;

            const Comparison = Math.floor(ParryValue + Bonus);
            let Patzer = false;
            let Critical = false;
            let Ok = false;

            for (let i = 0; i < 2; i += 1) {
                dice.push(Random.int(1, 20));
            }

            // If there is a cleaner way to do these checks, I'm all into it.
            if (dice[0] === 1 && dice[1] <= Comparison) {
                Critical = true;
                Ok = true;
            } else if (dice[0] <= Comparison && !Critical) {
                Ok = true;
                dice.pop();
            } else if (dice[0] === 20 && dice[1] > Comparison) {
                Patzer = true;
            } else if (dice[0] > Comparison) {
                dice.pop();
            }

            let Reply = `Du versuchst, mit ${Weapon.name} zu parieren.\n`;
            Reply += `Dein Paradewert für ${CombatTechnique.name}  ist ${Math.floor(
                ParryValue - Weapon.pa_mod
            )}. (Waffe ${Weapon.pa_mod})\n`;
            Reply += `Deine 🎲: ${dice.join(', ')}\n\n`;

            if (!Ok) {
                Reply += findMessage('PARRY_FAIL');
                if (Patzer) {
                    Reply += findMessage('PARRY_CRIT_FAIL');
                }
            } else {
                if (Critical) {
                    Reply += findMessage('PARRY_CRIT_SUCCESS');
                }
                if (!Critical) {
                    Reply += findMessage('PARRY_SUCCESS');
                }
            }

            return message.reply(Reply);
        });
    },
};
