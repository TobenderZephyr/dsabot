const { getAttributeLevels } = require('@dsabot/getAttributeLevels');
const Spells = require('../data/Spells');
/* definition of attributes in spell database

  {
    id: 'adlerauge',                        // the id of the spell inside characters database.
    name: 'Adlerauge',                      // the well-known name of the spell.
    attributes: [ 'KL', 'IN', 'FF' ],       // needed attribute checks when casting the spell
    spellduration: 2,                       // the player needs this many actions to cast the spell. 
    modified_by: [],                        // the spell is modified by this character's attribute
    cost: null,                             // how many units does the spell cost? (when activated)
    cost_type: 'asp',                       // what kind of points does the character need?
                                            // AsP = Astral Points, KaP = Karmal Points
    effect: '',                             // What is the desired effect of this spell?
    effectduration: ''                      // How long does the effect last?
    talent: null                            //  
  },

*/

const getSpell = ({ Character: Character = [], spell_name: spell_name = '' } = {}) => {
    const spell_entry =
        Spells.find(spell => spell.id.toLowerCase() === spell_name.toLowerCase()) ||
        Spells.find(spell => spell.name.toLowerCase() === spell_name.toLowerCase());

    if (!spell_entry) {
        console.log(`getSpell did not find entry for ${spell_name}`);
        return;
    }

    let Level = 0; // This is the minimum attributes value.
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
