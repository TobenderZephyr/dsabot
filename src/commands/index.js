const fs = require('fs');
const fetch = require('node-fetch')
const roll = require('./roll');
const create = require('./create');
const add = require('./add');
const remove = require('./remove');
const show = require('./show');
const talent = require('./talent')
const skill = require('./skill')
const createFromFile = require('./createFromFile')
require('dotenv').config();

const prefix = process.env.PREFIX || '!';

const commands = {
  roll,
  create,
  add,
  remove,
  show,
  skill,
  talent,
};
var Datastore = require('nedb'),
  db = new Datastore({
    filename: 'dsabot.db',
    autoload: true
  });

module.exports = async (message) => {

  if ((message.attachments.length > 0) && message.channel.type == 'dm') {
    try {
      let response = await fetch(message.attachments.first().url)
      let data = await validateJSON(response);
      if (data) createFromFile(message, data, db);
    } catch (e) {
      return null
    }
  } else {
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if (Object.keys(commands).includes(command)) {
      commands[command](message, args, db);
    }
  }
};

function validateJSON(body) {
  try {
    var data = body.json();
    // if came to here, then valid
    return data;
  } catch (e) {
    // failed to parse
    return null;
  }
}