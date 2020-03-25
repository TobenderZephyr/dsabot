require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql'); 
const prefix = '!';

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

bot.on('message', (message) =>{
  var n;
  //command manager
  if (!message.content.startsWith(prefix) || message.author.bot) return; 

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  //dice:
  if(command === 'roll') {
    if (!args.length == 3) {
      return message.reply('Du hast die Würfel nicht korrekt angegeben.');
    }

    else if(!isNaN(args[0]) && !isNaN(args[2]) && args[0] > 0 && args[2] > 0) {
      var roll = [];
      for (let i = 0; i < args[0]; i++) {
        var a = Math.floor(Math.random() * args[2]) + 1;
        roll.push(a);
      }
      message.reply('Deine Würfe(' + args[0] + 'W' + args[2] + '): ' + roll.join(', ') + '.');
    } else {
      return message.reply('Du hast die Würfel nicht korrekt angegeben.');
    }

  }

  //create money 'account'
  if(command == 'create'){
    db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
      if(row.length < 1) {
        db.query('INSERT INTO `DSAGeld` (`userName`, `GD`,`ST`, `BH`, `EK`) VALUES (' + '"' + message.author.tag + '"' + ', 0, 0, 0, 0)');
        message.reply('Dein Eintrag wurde registriert.');
      } else if(row) {
        message.reply('Dein Eintrag existiert bereits.');
      }
    });
  }

  //add money
  if(command === 'add') {
    if(!isNaN(args[0]) && (args[1] === 'GD' || args[1] === 'ST' || args[1] === 'BH' || args[1] === 'EK')) {
      db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
        if(row && err) {
          message.reply('Es gab einen Fehler.');
        }
        if(row.length < 1) { //if the user is not in the database
          message.reply('Es existiert kein Eintrag für dich füge ihn mit !create hinzu.');
        } else { //if the user is in the database
          if(args[1] === 'GD') {
            n = parseInt(row[0].GD, 10) + parseInt(args[0], 10);
          } else if(args[1] === 'ST') {
            n = parseInt(row[0].ST, 10) + parseInt(args[0], 10);
          } else if(args[1] === 'BH') {
            n = parseInt(row[0].BH, 10) + parseInt(args[0], 10);
          } else if(args[1] === 'EK') {
            n = parseInt(row[0].EK, 10) + parseInt(args[0], 10);
          }
                
          db.query('UPDATE DSAGeld SET' + '`' + args[1] + '`' + ' = (' + n + ') WHERE userName = ' + '"' + message.author.tag + '"');
          db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
            message.reply(args[0] + args[1] + ' hinzugefügt, du hast: ' + row[0].GD + 'GD, ' + row[0].ST + 'ST, ' + row[0].BH + 'BH, ' + row[0].EK + 'EK.');
          });
        }
      });
    }
  }

  //remove money
  if(command === 'remove') {
    if(!isNaN(args[0]) && (args[1] === 'GD' || args[1] === 'ST' || args[1] === 'BH' || args[1] === 'EK')) {
      db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
        if(row && err) {
          message.reply('Es gab einen Fehler.');
        }
        if(!row) { //if the user is not in the database
          message.reply('Es existiert kein Eintrag für dich füge ihn mit !create hinzu.');
        } else { //if the user is in the database
          
          if(args[1] === 'GD') {
            n = parseInt(row[0].GD, 10) - parseInt(args[0], 10);
          } else if(args[1] === 'ST') {
            n = parseInt(row[0].ST, 10) - parseInt(args[0], 10);
          } else if(args[1] === 'BH') {
            n = parseInt(row[0].BH, 10) - parseInt(args[0], 10);
          } else if(args[1] === 'EK') {
            n = parseInt(row[0].EK, 10) - parseInt(args[0], 10);
          }
                
          if(n >= 0) {
            db.query('UPDATE DSAGeld SET' + '`' + args[1] + '`' + ' = (' + n + ') WHERE userName = ' + '"' + message.author.tag + '"');
            db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
              message.reply(args[0] + args[1] + ' abgezogen, du hast: ' + row[0].GD + 'GD, ' + row[0].ST + 'ST, ' + row[0].BH + 'BH, ' + row[0].EK + 'EK.');
            });
          } else if(n < 0) {
            message.reply('du hast nicht genügend ' + args[1] );
          }    
        }
      });
    }
  }

  //show money

  if(command === 'show') {
    db.query('SELECT * FROM DSAGeld WHERE userName = ' + '"' + message.author.tag + '"', function(err, row) { //the row is the user's data
      message.reply('du hast: ' + row[0].GD + ' GD, ' + row[0].ST + ' ST, ' + row[0].BH + ' BH, ' + row[0].EK + ' EK.' );
    }
    );}
});

bot.login('process.env.BOT_TOKEN');

