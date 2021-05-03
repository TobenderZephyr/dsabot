const { findMessage } = require('@dsabot/findMessage');
const { getSkill } = require('@dsabot/getSkill');
const { isEmpty } = require('@dsabot/isEmpty');
const { db } = require('../globals');

module.exports = {
    name: 'skill',
    description: 'Zeigt dir deinen Fertigkeitswert im jeweiligen Talent.',
    aliases: [],
    usage: '<Fertigkeit>',
    needs_args: true,

    async exec(message, args) {
        db.find({ user: message.author.tag })
            .then(docs => {
                if (isEmpty(docs)) {
                    return message.reply(findMessage('NOENTRY'));
                }
                const Skill = getSkill({ Character: docs[0].character, args: args });
                if (!Skill) {
                    return message.reply(findMessage('TALENT_UNKNOWN'));
                }
                return message.reply(`Du hast folgenden Wert in **${Skill.Name}**: ${Skill.Level}`);
            })
            .catch(err => {
                message.reply(findMessage('ERROR'));
                throw new Error(err);
            });
    },
};
