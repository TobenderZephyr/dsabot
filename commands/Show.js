const Discord = require('discord.js');
const { findMessage } = require('@dsabot/findMessage');
const { isEmpty } = require('@dsabot/isEmpty');

const { db } = require('../globals');

module.exports = {
    name: 'show',
    description: '',
    aliases: [],
    usage: '',
    needs_args: false,

    async exec(message) {
        db.find({ user: message.author.tag })
            .then(docs => {
                if (isEmpty(docs)) {
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
