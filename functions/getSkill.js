const { getAttributeLevels } = require('@dsabot/getAttributeLevels');
const { Talente } = require('../globals');

const getSkill = ({ Character: Character = [], args: args = [] } = {}) => {
    const skillEntry =
        Talente.find(skill => skill.id.toLowerCase() === args[0].toLowerCase()) ||
        Talente.find(skill => skill.name.toLowerCase() === args[0].toLowerCase());

    if (!skillEntry) {
        return null;
    }

    let Level = 0; // This is the minimum attributes value.
    const cSkill = Character.skills.find(skill => skill.id === skillEntry.id) || null;
    if (cSkill) {
        Level = cSkill.level || 0;
    }
    const Name = Talente.find(skill => skill.id === skillEntry.id).name;
    const Attributes = getAttributeLevels(skillEntry.values, Character);

    return {
        Name: Name,
        Level: Level,
        Attributes: Attributes,
    };
};
module.exports = { getSkill };
