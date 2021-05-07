require('module-alias/register');
require('dotenv').config();
const fs = require('fs');
const got = require('got');
const Discord = require('discord.js');
const { findMessage } = require('@dsabot/findMessage');
const { db } = require('./globals');

db.load();
const cmdprefix = process.env.CMDPREFIX || '!';
const client = new Discord.Client();

async function CreateFromFile(message, data) {
    db.find({
        user: message.author.tag,
    }).then(docs => {
        if (docs.length === 0) {
            db.insert({ uid: `${message.author.id}`, user: message.author.tag, character: data })
                .then(() => message.reply(findMessage('SAVED_DATA')))
                .catch(e => {
                    console.log(e);
                    message.reply(findMessage('ERROR'));
                });
        }
    });
}
async function commandHandler(message) {
    if (message.attachments.size > 0 && message.channel.type === 'dm' && !message.author.bot) {
        try {
            got(message.attachments.first().url).then(data => CreateFromFile(message, data.body));
        } catch (e) {
            console.log(e);
            return message.reply(findMessage('ERROR'));
        }
    } else {
        if (!message.content.startsWith(cmdprefix) || message.author.bot) {
            return null;
        }
        const args = message.content.slice(cmdprefix.length).split(' ');
        const commandName = args.shift().toLowerCase();
        const command =
            client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return null;
        if (command.needs_args && !args.length) {
            return message.reply(
                `${findMessage('TOO_FEW_ARGS')}\n${cmdprefix}${commandName} ${command.usage}`
            );
        }
        command.exec(message, args);
    }
    return null;
}

client.commands = new Discord.Collection();
client.on('message', commandHandler);
client.login(process.env.BOT_TOKEN);
client.once('ready', () => {
    console.log('Ready!');
});
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`); // eslint-disable-line global-require, import/no-dynamic-require
    client.commands.set(command.name, command);
});
