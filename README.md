# DSA Discord Bot

This is a Discord Bot that can be used for the german P&PRPG "Das Schwarze Auge" or "The Dark Eye" in english. The Bot can be used to roll dice and keep track of the In-Game Money as well as the life points.

# Commands

## Dice Rolling

### !roll *x* W/D *y*

This command can be used to roll dice. To use it one has to put in the number of dice to use as the *x* and the number of sides as the *y* in between those Numbers stands W/D which simply means dice(D) or the german word "Würfel" (W). Theoretically it doesn't matter what Letter is in between but for roleplay gamers this should feel natural.

## Tracking System

### !Create

With this command one can create an record for tracking money and life points in a database. It is saved with the user name so currently it is not possible to have multiple records for one user. 

### !add *x* GD/ST/BH/EK/LP

This command adds to the record. For that the user has to type in the ammount *x* he wish to add and what he wants to add. The abrreviations mean:

GD: "Golddukaten" (gold ducats)
ST: "Silbertaler" (silver thaler)
BH: "Bronzeheller" (bronce ?)
EK: "Eisenkreuzer" (iron kreutzer)
LP: "Lebenspunkte"(life points)

### !remove *x* GD/ST/BH/EK/LP

This commands removes from the record. It works just like the add command just that it removes the ammount *x* from the choosen.

### !show

This command simply shows the record of the peron that writes the command.

# How to use

After cloning you need to install npm in the directory of the Bot. For that you need to have Node.js installed. You can install this from [here](https://nodejs.org/en/download/).

Then you need to run the following code inside of a terminal while beeing in the Bots directory:

`npm install`

As the next thing after this you should rename the .sample.env file to only .env

To connect the script to a Bot, you need to create a Bot using the Discord Developer Portal. To do this you can follow a guide like [this](https://discordpy.readthedocs.io/en/latest/discord.html).

Then you need to take the Token of your Bot and put it in the BOT_TOKEN in the .env file.

Then you need to either start a local server with mysql or connect to a remote one. For localhosting you can use [XAMPP](https://nodejs.org/en/download/) for windows or [MAMP](https://www.mamp.info/en/mac/) for Mac.

Then you need to change the DB_PASSWORD in the .env file to the one you have on your database server. After that you may have to update the connection Data int the /src/index.js file if you have a different host or port. Your database should either be named 'DSA' or you need to change the name of the database in the connection in /src/index.js. In your database you need to create a table named 'dsageld' with 6 columns:

|column defintion|column definition|
|:---------------|:----------------|
|userName        | TEXT            |
|GD              | INT             |
|ST              | INT             |
|BH              | INT             |
|LP              | INT             |
|EK              | INT             |

You could change the names of the columns and table but than you would have to change every query.

When you joined your Bot to your desired channel you need to start your database server if you have a local one and than type the following command in a terminal when you are in the directory of the bot:

`npm start`

Then your Bot should run and be working in your channel.

