const { getAttributeLevels } = require('@dsabot/getAttributeLevels');

//JSON.parse(require('fs').readFileSync('../data/Spells.json'))
const Chants = require('../data/Chants');

/* definition of attributes in chant database

  {
    id: 'adlerauge',                        // the id of the chant inside characters database.
    name: 'Adlerauge',                      // the well-known name of the chant.
    attributes: [ 'KL', 'IN', 'FF' ],       // needed attribute checks when casting the chant
    chantduration: 2,                       // the player needs this many actions to cast the chant. 
    modified_by: [],                        // the chant is modified by this character's attribute
    cost: null,                             // how many units does the chant cost? (when activated)
    cost_type: 'asp',                       // what kind of points does the character need?
                                            // AsP = Astral Points, KaP = Karmal Points
    effect: '',                             // What is the desired effect of this chant?
    effectduration: ''                      // How long does the effect last?
    talent: null                            //  
  },

*/

const getChant = ({ Character: Character = [], chant_name: chant_name = '' } = {}) => {
    let chant_entry =
        Chants.find(chant => chant.id.toLowerCase() === chant_name.toLowerCase()) ||
        Chants.find(chant => chant.name.toLowerCase() === chant_name.toLowerCase());

    if (!chant_entry) {
        console.log(`getchant did not find entry for ${chant_name}`);
        return;
    }

    let Level = 0; // This is the minimum attributes value.
    let Chant = Character.chants.find(chant => chant.id === chant_entry.id) || {};
    if (Chant) {
        Level = Chant.level || 0;
    }
    let Name = Chant.name;
    //let ModifiedBy = Chant.modified_by;
    let Attributes = getAttributeLevels(chant_entry.attributes, Character);

    return {
        Name: Name,
        Level: Level,
        Attributes: Attributes,
        //ModifiedBy: ModifiedBy,
    };
};
module.exports = { getChant };
