const { getAttributeLevels } = require('@dsabot/getAttributeLevels');
const Spells = require('@Lib/Spells.json');
const { isEmpty } = require('@dsabot/isEmpty');

const getSpell = ({ Character: Character = [], spell_name: spellName = '' } = {}) => {
    if (!Character.hasOwnProperty('spells')) return null;
    const spellEntry =
        Spells.find(spell => spell.id.toLowerCase() === spellName.toLowerCase()) ||
        Spells.find(spell => spell.name.toLowerCase() === spellName.toLowerCase());

    if (isEmpty(spellEntry)) return null;

    const Spell = Character.spells.find(spell => spell.id === spellEntry.id); //?+
    const Level = Spell.hasOwnProperty('level') ? Spell.level : 0;

    const ModifiedBy = spellEntry.modified_by;
    const Attributes = getAttributeLevels(spellEntry.attributes, Character);

    return { Name: spellEntry.name, Level: Level, Attributes: Attributes, ModifiedBy: ModifiedBy };
};
module.exports = { getSpell };
