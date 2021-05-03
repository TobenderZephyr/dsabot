const Discord = require('discord.js');
const { db } = require('../globals');
const { findMessage } = require('@dsabot/findMessage');

module.exports = {
    name: 'show',
    description: '',
    aliases: [],
    usage: '',
    needs_args: false,

    // eslint-disable-next-line no-unused-vars
    async exec(message, args) {
        db.find({ user: message.author.tag })
            .then(docs => {
                if (docs.length === 0) {
                    return message.reply(findMessage('NOENTRY'));
                }
                const Character = docs[0].character;

                const Gender = Character.sex === 'female' ? '♀️' : '♂️';

                const Reply = new Discord.MessageEmbed();
                Reply.setColor('#0099ff');
                Reply.setTitle(`${Gender} ${Character.name}`);
                Reply.setDescription(
                    `${Character.age} Jahre, ${Character.race}/${Character.culture}`
                );
                Reply.addField(Character.professionname, Character.xp.startinglevel);

                return message.reply(Reply);
            })
            .catch(err => {
                message.reply(findMessage('ERROR'));
                throw new Error(err);
            });
    },
};
