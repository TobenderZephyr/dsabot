const { Talente } = require('../globals');
const { getAttributeLevels } = require('@dsabot/getAttributeLevels');

const getSkill = ({ Character: Character = [], args: args = [] } = {}) => {
    let skill_entry =
        Talente.find(skill => skill.id.toLowerCase() === args[0].toLowerCase()) ||
        Talente.find(skill => skill.name.toLowerCase() === args[0].toLowerCase());

    if (!skill_entry) {
        return null;
    }

    let Level = 0; // This is the minimum attributes value.
    const cSkill = Character.skills.find(skill => skill.id === skill_entry.id) || null;
    if (cSkill) {
        Level = cSkill.level || 0;
    }
    const Name = Talente.find(skill => skill.id === skill_entry.id).name;
    const Attributes = getAttributeLevels(skill_entry.values, Character);

    return {
        Name: Name,
        Level: Level,
        Attributes: Attributes,
    };
};
module.exports = { getSkill };
