require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const commandHandler = require('./commands');

bot.on('message', commandHandler);

bot.login(process.env.BOT_TOKEN);

