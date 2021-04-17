require('module-alias/register');
require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');
const globals = require('./globals');
const db = globals.db;
const cmdprefix = process.env.CMDPREFIX || '!';
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.on('message', commandHandler);
client.login(process.env.BOT_TOKEN);
client.once('ready', () => {
	console.log('Ready!');
});


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

async function commandHandler(message) {
	//console.log(`${new Date().toUTCString()} ${message.author.tag} (size: ${message.attachments.size})`);
	if ((message.attachments.size > 0) && message.channel.type == 'dm' && !message.author.bot) {
		try {
			const response = await fetch(message.attachments.first().url);
			const data = await validateJSON(response);
			if (data) await CreateFromFile(message, data);
		} catch (e) {
			console.log(e);
			return message.reply(globals.Replies.find(x => x.id === 'ERROR').string);
		}
	} else {
		if (!message.content.startsWith(cmdprefix) || message.author.bot) {
			return;
		}
		const args = message.content.slice(cmdprefix.length).split(' ');
		const commandName = args.shift().toLowerCase();
		//if (!client.commands.has(commandName)) return;
		try {
			const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
			if (!command) return;
			if (command.needs_args && !args.length) {
				return message.reply(
					globals.Replies.find(x => x.id === 'TOO_FEW_ARGS').string +
					cmdprefix + commandName + ' ' + command.usage
				);
			} else {
				command.exec(message, args);
			}
		} catch (e) {
			message.reply(globals.Replies.find(x => x.id === 'ERROR').string);
		}
	}
}

function validateJSON(body) {
	try {
		const data = body.json();
		return data;
	} catch (e) {
		return null;
	}
}

async function CreateFromFile(message, data) {
	try {
		db.find({
			user: message.author.tag,
		}, function (err, docs) {
			if (docs.length === 0) {
				db.insert({
					user: message.author.tag,
					character: data,
				}, function (err, docs) {
					message.reply(globals.Replies.find(r => r.id === 'SAVED_DATA').string);
				});
			}
		});
	} catch (e) {
		throw e;
	}
}