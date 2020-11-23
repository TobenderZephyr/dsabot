const fs = require('fs');
const fetch = require('node-fetch');
const roll = require('./roll');
const create = require('./create');
const add = require('./add');
const remove = require('./remove');
const show = require('./show');
const tp = require('./tp');
const talent = require('./talent');
const skill = require('./skill');
const createFromFile = require('./createFromFile');
require('dotenv').config();

const cmdprefix = process.env.CMDPREFIX || '!';

const commands = {
	roll,
	create,
	add,
	remove,
	show,
	skill,
	tp,
	talent,
};
const Datastore = require('nedb'),
	db = new Datastore({
		filename: 'dsabot.db',
		autoload: true,
	});

module.exports = async (message) => {
	console.log(`${new Date().toUTCString()} ${message.author.tag} (size: ${message.attachments.size})`)
	if ((message.attachments.size > 0) && message.channel.type == 'dm' && !message.author.bot) {
		try {
			const response = await fetch(message.attachments.first().url);
			const data = await validateJSON(response);
			if (data) createFromFile(message, data, db);
		}
		catch (e) {
			return null;
		}
	}
	else {

		if (!message.content.startsWith(cmdprefix) || message.author.bot) return;
		const args = message.content.slice(cmdprefix.length).split(' ');
		const command = args.shift().toLowerCase();
		if (Object.keys(commands).includes(command)) {
			commands[command](message, args, db);
		}
	}
};

function validateJSON(body) {
	try {
		const data = body.json();
		// if came to here, then valid
		return data;
	}
	catch (e) {
		// failed to parse
		return null;
	}
}