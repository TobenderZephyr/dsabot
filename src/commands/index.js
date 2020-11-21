const roll = require('./roll');
const create = require('./create');
const add = require('./add');
const remove = require('./remove');
const show = require('./show');
const talent = require('./talent')
require('dotenv').config();
const prefix = '!';

const commands = {
  roll,
  create,
  add,
  remove,
  show,
  talent
};
var Datastore = require('nedb'),
  db = new Datastore({
    filename: 'dsabot.db',
    autoload: true
  });

module.exports = async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (Object.keys(commands).includes(command)) {
    commands[command](message, args, db);
  }

};