const { getAttributeLevels } = require('@dsabot/getAttributeLevels');
const Chants = require('@Lib/Chants.json');

const getChant = ({ Character: Character = [], chant_name: chantName = '' } = {}) => {
    //if (!Character.hasOwnProperty('chants')) return;
    const chantEntry =
        Chants.find(chant => chant.id.toLowerCase() === chantName.toLowerCase()) ||
        Chants.find(chant => chant.name.toLowerCase() === chantName.toLowerCase());

    if (!chantEntry) {
        console.log(`getChant() Did not find entry for ${chantName}`);
        return null;
    }

    let Level = 0; // This is the minimum attributes value.
    const Chant = Character.chants.find(chant => chant.id === chantEntry.id) || null;
    if (Chant && Chant.hasOwnProperty('level')) {
        Level = Chant.level || 0;
    }
    const Attributes = getAttributeLevels(chantEntry.attributes, Character);

    return { Name: chantEntry.name, Level: Level, Attributes: Attributes };
};
module.exports = { getChant };
