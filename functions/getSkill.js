const globals = require('../globals');

const getSkill = ({ Character: Character = [], args: args = [] } = {}) => {
	let skill_entry = globals.Talente.find(skill => skill.id.toLowerCase() === args[0].toLowerCase()) ||
		globals.Talente.find(skill => skill.name.toLowerCase() === args[0].toLowerCase());

	if (!skill_entry) { return; }
	let Level = 0; // This is the minimum attributes value.
	let cSkill = Character.skills.find(skill => skill.id === skill_entry.id) || {};
	if (cSkill) {
		Level = cSkill.level || 0;
	}
	let Name = globals.Talente.find(skill => skill.id === skill_entry.id).name;

	return {
		Name: Name,
		Level: Level
	};
};
module.exports = { getSkill };
