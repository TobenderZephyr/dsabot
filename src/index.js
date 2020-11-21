require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const SERVERID = process.env.SERVERID
const commandHandler = require('./commands');

client.on('message', commandHandler);

client.login(process.env.BOT_TOKEN);
client.once('ready', () => {
    console.log('Ready!');
  });