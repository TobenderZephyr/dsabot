const roll = require('./roll');
const create = require('./create');
const add = require('./add');
const remove = require('./remove');
const show = require('./show');
const mysql = require('mysql'); 
require('dotenv').config();
const prefix = '!';

const commands = {
  roll,
  create,
  add,
  remove,
  show
};

var db = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : process.env.DB_PASSWORD,
  database : 'DSA'
});

db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('MySql connected...');
});

module.exports = async (message) =>{
  //command manager
  if (!message.content.startsWith(prefix) || message.author.bot) return; 
  
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if(Object.keys(commands).includes(command)) {
    commands[command](message, args, db);
  }
  
};
