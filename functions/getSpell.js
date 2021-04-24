const globals = require('../globals');
const { getAttributeLevels } = require('@dsabot/getAttributeLevels');

const getSpell = ({ Character: Character = [], spell_name: spell_name = '' } = {}) => {
    let spell_entry =
        globals.Spells.find(spell => spell.id.toLowerCase() === spell_name.toLowerCase()) ||
        globals.Spells.find(spell => spell.name.toLowerCase() === spell_name.toLowerCase());

    if (!spell_entry) {
        console.log(`getSpell did not find entry for ${spell_name}`);
        return;
    }

    let Level = 0; // This is the minimum attributes value.
    let Spell = Character.spells.find(spell => spell.id === spell_entry.id) || {};
    if (Spell) {
        Level = Spell.level || 0;
    }
    let Name = globals.Spells.find(spell => spell.id === spell_entry.id).name;
    let ModifiedBy = globals.Spells.find(spell => spell.id === spell_entry.id).modified_by;
    let Attributes = getAttributeLevels(spell_entry.attributes, Character);

    return {
        Name: Name,
        Level: Level,
        Attributes: Attributes,
        ModifiedBy: ModifiedBy,
    };
};
module.exports = { getSpell };
