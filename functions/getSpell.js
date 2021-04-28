const { getAttributeLevels } = require('@dsabot/getAttributeLevels');
const Spells = require('@Lib/Spells.json');

const getSpell = ({ Character: Character = [], spell_name: spell_name = '' } = {}) => {
    const spell_entry =
        Spells.find(spell => spell.id.toLowerCase() === spell_name.toLowerCase()) ||
        Spells.find(spell => spell.name.toLowerCase() === spell_name.toLowerCase());

    if (!spell_entry) {
        console.log(`getSpell() did not find entry for ${spell_name}`);
        return;
    }

    let Level = 0; // This is the minimum attributes value.
    if (!Character.hasOwnProperty('spells')) return;
    let Spell = Character.spells.find(spell => spell.id === spell_entry.id) || {}; //?+
    if (Spell && Spell.hasOwnProperty('level')) {
        Level = Spell.level || 0;
    }
    let ModifiedBy = spell_entry.modified_by;
    let Attributes = getAttributeLevels(spell_entry.attributes, Character);

    return {
        Name: spell_entry.name,
        Level: Level,
        Attributes: Attributes,
        ModifiedBy: ModifiedBy,
    };
};
module.exports = { getSpell };
