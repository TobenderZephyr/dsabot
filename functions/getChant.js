require('module-alias/register');
const { getAttributeLevels } = require('@dsabot/getAttributeLevels');
const Chants = require('@Lib/Chants.json');
const { isEmpty } = require('@dsabot/isEmpty');

const getChant = ({ Character: Character = [], chant_name: chantName = '' } = {}) => {
    if (!Character.hasOwnProperty('chants')) return null;
    const chantEntry =
        Chants.find(chant => chant.id.toLowerCase() === chantName.toLowerCase()) ||
        Chants.find(chant => chant.name.toLowerCase() === chantName.toLowerCase());

    // let us filter out blessings.
    if (isEmpty(chantEntry)) return null;
    const Chant = Character.chants.find(chant => chant.id === chantEntry.id); // || null;
    const Level = Chant.hasOwnProperty('level') ? Chant.level : 0;
    const Attributes = getAttributeLevels(chantEntry.attributes, Character);

    return { Name: chantEntry.name, Level: Level, Attributes: Attributes };
};
module.exports = { getChant };
