const globals = require('../globals');
const db = globals.db;
const Random = require('random');
//const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');

module.exports = {
    name: 'attack',
    description: 'Würfelt den Attackewert auf eine Nahkampfwaffe.',
    aliases: ['angriff', 'attacke'],
    usage: '<Waffe>',
    needs_args: true,

    async exec(message, args) {
        try {
            db.find({ user: message.author.tag }, handleAttack(err, docs));
        } catch (e) {
            throw e;
        }
    },
};

function handleAttack(err, docs) {
    if (docs.length === 0) {
        return message.reply(findMessage('NOENTRY'));
    }

    Random.use(message.author.tag);

    const Player = docs[0].character;
    const Weapon = getWeapon(args[0]);
    if (!Weapon) {
        return message.reply(findMessage('NO_SUCH_WEAPON'));
    }

    // Determining Both Attack and Ranged Attack Values.
    let CombatTechnique = getPlayerCombatTechnique(Player, getCombatTechnique(Weapon));
    let CombatTechniqueValue = CombatTechnique.hasOwnProperty('level') ? CombatTechnique.level : 6;

    let Attribute = isMeleeWeapon(Weapon)
        ? getAttribute(Player, 'mut')
        : getAttribute(Player, 'fingerfertigkeit');

    let AttackValue = isMeleeWeapon(Weapon)
        ? CombatTechniqueValue + Weapon.at_mod
        : CombatTechniqueValue;

    AttackValue += Math.floor((Attribute - 8) / 3);

    let dice = [];
    let Bonus = 0;
    if (args[1] && !isNaN(parseInt(args[1]))) {
        Bonus = parseInt(args[1]);
    }
    let Comparison = Math.floor(AttackValue + Bonus);
    let CriticalHit = false;
    let Patzer = false;
    let Ok = false;
    let DoubleDamage = false;

    for (let i = 0; i < 2; i++) {
        dice.push(Random.int(1, 20));
    }

    // If there is a cleaner way to do these checks, I'm all into it.
    if (dice[0] == 1 && dice[1] <= Comparison) {
        CriticalHit = true;
        DoubleDamage = true;
        Ok = true;
    } else if (dice[0] == 1 && dice[1] > Comparison) {
        CriticalHit = true;
        Ok = true;
    } else if (dice[0] == 20 && dice[1] > Comparison) {
        Patzer = true;
    } else if (dice[0] <= Comparison && !CriticalHit) {
        Ok = true;
        dice.pop();
    } else if (dice[0] > Comparison) {
        dice.pop();
    }

    let Reply =
        'Du greifst mit ' + globals.Declination[Weapon.article] + ' ' + Weapon.name + ' an.\n';
    Reply +=
        'Dein Angriffswert für ' +
        CombatTechnique.name +
        ' ist ' +
        Math.floor((Attribute - 8) / 3 + CombatTechniqueValue) +
        '. (KtW: ' +
        CombatTechniqueValue +
        ')\n';
    Reply += 'Deine 🎲: ` ' + dice.join(', ') + ' `.\n\n';

    if (!Ok) {
        Reply += findMessage('COMBAT_FAIL');
        if (Patzer) {
            Reply += findMessage('COMBAT_CRIT_FAIL');
        }
    } else {
        if (CriticalHit) {
            Reply += findMessage('COMBAT_CRIT_SUCCESS');
        }
        if (DoubleDamage) {
            Reply += findMessage('COMBAT_DOUBLEDAMAGE');
        }
        if (!CriticalHit) {
            Reply += findMessage('COMBAT_SUCCESS');
        }

        // adding 1 to damage for every point above weapon's "Leiteigenschaft"
        // applies only to Melee Weapons.
        let AttackBonus = 0;
        if (globals.MeleeWeapons.find(MeleeWeapon => MeleeWeapon.id === Weapon.id)) {
            if (Weapon.DmgThreshold) {
                CombatTechnique.Leiteigenschaft.forEach(LEKuerzel => {
                    let Leiteigenschaft = globals.Werte.find(
                        attribute => attribute.kuerzel === LEKuerzel
                    );
                    let DmgThreshold = Weapon.DmgThreshold;
                    let AttributeValue = Player.attributes.find(
                        attribute => attribute.id === Leiteigenschaft.id
                    ).level;
                    if (DmgThreshold < AttributeValue) {
                        AttackBonus += Math.floor(AttributeValue - DmgThreshold);
                    }
                });
            }
        }
        const DieModificator = Weapon.diemodificator;
        let Damage = DieModificator + AttackBonus;
        let DamageDice = [];
        for (let i = 0; i < Weapon.dice; i++) {
            DamageDice.push(Random.int(1, 6));
        }
        DamageDice.forEach(result => {
            Damage += result;
        });
        if (DoubleDamage) {
            Damage *= 2;
        }

        Reply += '\n\nHier aufklappen, wenn der Gegner nicht parieren/Ausweichen konnte:\n';
        Reply +=
            '||' +
            globals.Articles[Weapon.article] +
            ' ' +
            Weapon.name +
            ' (' +
            Weapon.dice +
            'W6+' +
            Weapon.diemodificator +
            ') erzielt ` ' +
            Damage +
            ' ` Schaden.';
        Reply += '\nDeine 🎲: ` ' + DamageDice.join(',') + ' `.||\n';
    }

    return message.reply(Reply);
}

const getCombatTechnique = Weapon => {
    if (Weapon)
        return globals.CombatTechniques.find(technique => technique.id === Weapon.combattechnique);
};
function getAttribute(Player = {}, Attribute = '') {
    return Player.attributes.find(a => a.id === Attribute).level;
}

function getPlayerCombatTechnique(Player = {}, CombatTechnique = {}) {
    if (Player && CombatTechnique)
        return Player.combattechniques.find(technique => technique.id === CombatTechnique.id);
}

function getWeapon(Weapon = '') {
    if (Weapon) return globals.Weapons.find(w => w.id === Weapon.toLowerCase());
}

function isMeleeWeapon(Weapon) {
    if (globals.MeleeWeapons.find(MeleeWeapon => MeleeWeapon.id === Weapon.id)) return true;
    else return false;
}
