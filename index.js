require('module-alias/register');
require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const { findMessage } = require('@dsabot/findMessage');
const { db } = require('./globals');

db.load();
const cmdprefix = process.env.CMDPREFIX || '!';
const client = new Discord.Client();

function validateJSON(body) {
    try {
        const data = body.json();
        return data;
    } catch (e) {
        return null;
    }
}

async function CreateFromFile(message, data) {
    db.find({
        user: message.author.tag,
    }).then(docs => {
        if (docs.length === 0) {
            db.insert({
                user: message.author.tag,
                character: data,
            }).then(() => {
                message.reply(findMessage('SAVED_DATA'));
            });
        }
    });
}
async function commandHandler(message) {
    // console.log(`${new Date().toUTCString()} ${message.author.tag} (size: ${message.attachments.size})`);
    if (message.attachments.size > 0 && message.channel.type === 'dm' && !message.author.bot) {
        try {
            const response = await fetch(message.attachments.first().url);
            const data = await validateJSON(response);
            if (data) await CreateFromFile(message, data);
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
                `${findMessage('TOO_FEW_ARGS').string}\n${cmdprefix}${commandName} ${command.usage}`
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
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});
