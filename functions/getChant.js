const { getAttributeLevels } = require('@dsabot/getAttributeLevels');
const Chants = require('@Lib/Chants.json');

const getChant = ({ Character: Character = [], chant_name: chant_name = '' } = {}) => {
    //if (!Character.hasOwnProperty('chants')) return;
    let chant_entry =
        Chants.find(chant => chant.id.toLowerCase() === chant_name.toLowerCase()) ||
        Chants.find(chant => chant.name.toLowerCase() === chant_name.toLowerCase());

    if (!chant_entry) {
        console.log(`getChant() Did not find entry for ${chant_name}`);
        return null;
    }

    let Level = 0; // This is the minimum attributes value.
    const Chant = Character.chants.find(chant => chant.id === chant_entry.id) || null;
    if (Chant && Chant.hasOwnProperty('level')) {
        Level = Chant.level || 0;
    }
    const Attributes = getAttributeLevels(chant_entry.attributes, Character);

    return { Name: chant_entry.name, Level: Level, Attributes: Attributes };
};
module.exports = { getChant };
