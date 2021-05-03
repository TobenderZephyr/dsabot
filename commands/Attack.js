require('module-alias/register');
const { roll } = require('@dsabot/Roll');
const { findMessage } = require('@dsabot/findMessage');
const { isEmpty } = require('@dsabot/isEmpty');

const { db } = require('../globals');
const { CombatTechniques } = require('../globals');
const { Werte } = require('../globals');
const { Weapons } = require('../globals');
const { MeleeWeapons } = require('../globals');

function getCombatTechnique(Weapon) {
    if (Weapon) return CombatTechniques.find(technique => technique.id === Weapon.combattechnique);
    return null;
}
function getAttribute(abbr) {
    return Werte.find(attribute => attribute.kuerzel === abbr);
}

function CompareAttackResult(dice = [8, 8], Comparison = 6) {
    let ok = false;
    let crit = false;
    let dd = false;
    let fumble = false;

    dice.forEach((val, index) => {
        if (index === 0) {
            ok = val <= Comparison ? true : false;
            crit = val === 1 ? true : false;
            fumble = val === 20 ? true : false;
            if ((ok && !crit) || (!ok && !fumble)) {
                dice.pop();
            }
        }
        if (index === 1) {
            dd = crit && val < Comparison ? true : false;
            fumble = !crit && val > Comparison ? true : false;
        }
    });
    return {
        Ok: ok,
        Patzer: fumble,
        CriticalHit: crit,
        DoubleDamage: dd,
        Dice: dice,
    };
}

function getAttributeLevel(Player = {}, Attribute = '') {
    return Player.attributes.find(a => a.id === Attribute).level;
}

function getCombatTechniqueLevel(Player = {}, CombatTechnique = {}) {
    if (Player && CombatTechnique) {
        const p = Player.combattechniques.find(technique => technique.id === CombatTechnique.id);
        return {
            id: CombatTechnique.id,
            name: CombatTechnique.name,
            level: p ? p.level : 6,
            Leiteigenschaft: CombatTechnique.Leiteigenschaft,
        };
    }
    return null;
}

function getWeapon(Weapon = '') {
    return Weapons.find(
        w => w.id === Weapon.toLowerCase() || w.name.toLowerCase() === Weapon.toLowerCase()
    );
}

function isMeleeWeapon(Weapon) {
    if (MeleeWeapons.find(MeleeWeapon => MeleeWeapon.id === Weapon.id)) return true;
    return false;
}

function handleAttack(doc, { message, args }) {
    if (isEmpty(doc)) {
        return message.reply(findMessage('NOENTRY'));
    }

    const Player = doc.character;
    const Weapon = getWeapon(args[0]);
    if (!Weapon) {
        return message.reply(findMessage('NO_SUCH_WEAPON'));
    }

    // Determining Both Attack and Ranged Attack Values.
    const CombatTechnique = getCombatTechniqueLevel(Player, getCombatTechnique(Weapon)); //?+

    const Attribute = isMeleeWeapon(Weapon)
        ? getAttributeLevel(Player, 'mut')
        : getAttributeLevel(Player, 'fingerfertigkeit');

    let AttackValue = isMeleeWeapon(Weapon)
        ? CombatTechnique.level + Weapon.at_mod
        : CombatTechnique.level;

    AttackValue += Math.floor((Attribute - 8) / 3);

    const { dice } = roll(2, 20);
    const Bonus = parseInt(args[1], 10) || 0;
    const Comparison = Math.floor(AttackValue + Bonus);
    const AttackResult = CompareAttackResult(dice, Comparison);

    let Reply = `Du greifst mit ${Weapon.name} an.\n Dein Angriffswert für ${CombatTechnique.name} ist ${AttackValue} (KtW: ${CombatTechnique.level})\n`;
    Reply += `Deine 🎲: \` ${AttackResult.Dice.join(', ')} \`\n\n`;

    Reply += !AttackResult.Ok ? findMessage('COMBAT_FAIL') : findMessage('COMBAT_SUCCESS');
    Reply += AttackResult.Patzer ? findMessage('COMBAT_CRIT_FAIL') : '';
    Reply += AttackResult.CriticalHit ? findMessage('COMBAT_CRIT_SUCCESS') : '';
    Reply += AttackResult.DoubleDamage ? findMessage('COMBAT_DOUBLEDAMAGE') : '';

    if (AttackResult.Ok) {
        // adding 1 to damage for every point above weapon's "Leiteigenschaft"
        // applies only to Melee Weapons.
        let AttackBonus = 0;
        if (isMeleeWeapon(Weapon) && Weapon.DmgThreshold) {
            CombatTechnique.Leiteigenschaft.forEach(abbr => {
                const attrib = getAttribute(abbr);
                const AttributeValue = getAttributeLevel(Player, attrib.id);
                if (Weapon.DmgThreshold < AttributeValue) {
                    AttackBonus += Math.floor(AttributeValue - Weapon.DmgThreshold);
                }
            });
        }

        const DamageDice = roll(1, 6).dice;
        let Damage = Weapon.diemodificator + AttackBonus + DamageDice.reduce((p, v) => p + v);
        Damage = AttackResult.DoubleDamage ? (Damage *= 2) : Damage;

        Reply += '\n\nHier aufklappen, wenn der Gegner nicht parieren/Ausweichen konnte:\n';
        Reply += `||\n`;
        Reply += ` ${Weapon.name} (${Weapon.dice}W6+${
            Weapon.diemodificator
        }) richtet ${Damage} schaden an. ${
            AttackBonus ? `(+${AttackBonus} Bonus auf Leiteigenschaft)` : ''
        }`;
        Reply += `\nDeine 🎲:  ${DamageDice.join(', ')}\n||\n`;
    }

    return message.reply(Reply);
}

module.exports = {
    name: 'attack',
    description: 'Würfelt den Attackewert auf eine Nahkampfwaffe.',
    aliases: ['angriff', 'attacke'],
    usage: '<Waffe>',
    needs_args: true,

    async exec(message, args) {
        db.findOne({ user: message.author.tag })
            .then(doc => {
                handleAttack(doc, { message, args });
            })
            .catch(err => {
                message.reply(findMessage('ERROR'));
                throw new Error(err);
            });
    },
};
