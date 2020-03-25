const roll = require('./roll');
const create = require('./create');
const add = require('./add');
const remove = require('./remove');
const show = require('./show');
const mysql = require('mysql'); 
const prefix = '!';

const commands = {
  roll,
  create,
  add,
  remove,
  show
};

var db = mysql.createConnection({
  host     : 'remotemysql.com',
  port     : '3306',
  user     : 'tftipudgeE',
  password : 'GYKju7YA1p',
  database : 'tftipudgeE'
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
  
  /*//dice:
    if(command === 'roll') roll(message, args);
  
    //create money 'account'
    if(command == 'create') create(message, args);
  
    //add money
    if(command === 'add') add(message, ags);
  
    //remove money
    if(command === 'remove') remove(message, args);
  
    //show money
  
    if(command === 'show') show(message, args);
    */
};