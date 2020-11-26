require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const commandHandler = require('./commands');

client.on('message', commandHandler);

client.login(process.env.BOT_TOKEN);
client.once('ready', () => {
	console.log('Ready!');
});


client.on('error', err => {
	console.error('Error\n' + err);
	process.exit(1);
});
client.on('disconnect', message => {
	console.error('User Disconnected');
	process.exit(1);
});

client.on('reconnecting', message => {
	console.log('User Reconnecting');
});
