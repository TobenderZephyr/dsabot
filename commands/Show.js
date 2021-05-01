// eslint-disable-next-line no-unused-vars
const globals = require('../globals');
const Discord = require('discord.js');
const db = globals.db;
const { findMessage } = require('@dsabot/findMessage');

module.exports = {
    name: 'show',
    description: '',
    aliases: [],
    usage: '',
    needs_args: false,

    // eslint-disable-next-line no-unused-vars
    async exec(message, args) {
        try {
            db.find(
                {
                    user: message.author.tag,
                },
                function (err, docs) {
                    if (docs.length === 0) {
                        return message.reply(findMessage('NOENTRY'));
                    } else {
                        const Character = docs[0].character;
                        let Gender;
                        if (Character.sex == 'female') {
                            Gender = '♀️';
                        } else {
                            Gender = '♂️';
                        }
                        const Reply = new Discord.MessageEmbed();
                        Reply.setColor('#0099ff');
                        Reply.setTitle(`${Gender} ${Character.name}`);
                        Reply.setDescription(
                            `${Character.age} Jahre, ${Character.race}/${Character.culture}`
                        );
                        Reply.addField(Character.professionname, Character.xp.startinglevel);

                        message.reply(Reply);
                    }
                }
            );
        } catch (e) {
            message.reply(findMessage('ERROR'));
            throw e;
        }
    },
};
