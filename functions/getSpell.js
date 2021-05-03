const { getAttributeLevels } = require('@dsabot/getAttributeLevels');
const Spells = require('@Lib/Spells.json');

const getSpell = ({ Character: Character = [], spell_name: spellName = '' } = {}) => {
    const spellEntry =
        Spells.find(spell => spell.id.toLowerCase() === spellName.toLowerCase()) ||
        Spells.find(spell => spell.name.toLowerCase() === spellName.toLowerCase());

    if (!spellEntry) {
        console.log(`getSpell() did not find entry for ${spellName}`);
        return null;
    }

    let Level = 0; // This is the minimum attributes value.
    if (!Character.hasOwnProperty('spells')) return null;
    const Spell = Character.spells.find(spell => spell.id === spellEntry.id) || null; //?+
    if (Spell && Spell.hasOwnProperty('level')) {
        Level = Spell.level || 0;
    }
    const ModifiedBy = spellEntry.modified_by;
    const Attributes = getAttributeLevels(spellEntry.attributes, Character);

    return {
        Name: spellEntry.name,
        Level: Level,
        Attributes: Attributes,
        ModifiedBy: ModifiedBy,
    };
};
module.exports = { getSpell };
