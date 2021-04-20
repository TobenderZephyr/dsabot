const globals = require('../globals');
const { getAttributeLevels } = require("@dsabot/getAttributeLevels");

const getSkill = ({ Character: Character = [], args: args = [] } = {}) => {
	let skill_entry = 	globals.Talente.find(skill => skill.id.toLowerCase() === args[0].toLowerCase()) ||
						globals.Talente.find(skill => skill.name.toLowerCase() === args[0].toLowerCase());

	if (!skill_entry) { return; }

	let Level = 0; // This is the minimum attributes value.
	let cSkill = Character.skills.find(skill => skill.id === skill_entry.id) || {};
	if (cSkill) {
		Level = cSkill.level || 0;
	}
	let Name = globals.Talente.find(skill => skill.id === skill_entry.id).name;
	let Attributes = getAttributeLevels(skill_entry.values, Character);

	return {
		Name: Name,
		Level: Level,
		Attributes: Attributes
	};
};
module.exports = { getSkill };
