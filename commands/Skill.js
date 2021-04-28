const globals = require('../globals');
const db = globals.db;
const { findMessage } = require('@dsabot/findMessage');
const { getSkill } = require('@dsabot/getSkill');
module.exports = {
    name: 'skill',
    description: 'Zeigt dir deinen Fertigkeitswert im jeweiligen Talent.',
    aliases: [],
    usage: '<Fertigkeit>',
    needs_args: true,

    async exec(message, args) {
        db.find({ user: message.author.tag }, (err, docs) => {
            if (docs.length === 0) {
                return message.reply(findMessage('NOENTRY'));
            }
            const Skill = getSkill({ Character: docs[0].character, args: args });
            if (!Skill) {
                return message.reply(findMessage('TALENT_UNKNOWN'));
            }
            return message.reply(`Du hast folgenden Wert in **${Skill.Name}**: ${Skill.Level}`);
        });
    },
};
