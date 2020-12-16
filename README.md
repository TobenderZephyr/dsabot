
# DSA Discord Bot

This Project is a fork of LucaSchwan/dsa-bot.

It is a Discord.js Bot written in JavaScript to support playing the German Pen & Paper RPG "Das Schwarze Auge" (The Dark Eye). The Bot has a built-in Database based on Endb and can handle character sheets from [The Dark Aid](https://www.ulisses-ebooks.de/product/212543/The-Dark-Aid-alpha).

It can roll dice and even compare results with your characters attributes.

# Commands

### !help
Send the user a simple command list with things to do.

## Dice Rolling

### !roll *x* W/D *y*

This command can be used to roll dice. To use it one has to put in the number of dice to use as the *x* and the number of sides as the *y* in between those Numbers stands W/D which simply means dice(D) or the german word "Würfel" (W). Theoretically it doesn't matter what Letter is in between but for roleplay gamers this should feel natural.

ie `!roll 3w20`

### !heads
Throw a coin. Heads or Tails?

## Tracking System
As this Bot should help with tracking your character, simply attach your .tdc file in a private message.

### !ep / !ap [Value]
Probes on your attributes.
Rolls 1 die and compares it with the given value. Rolls another, if returned number is 1 or 20.

ie `!ep 11`

### !ep / !ap [Attribute or Abbreviation]
Does the same as above. You don't need to remember your stats (if you sent a `tdc`-File, that is.)

ie. `!ep Mut` or `!ep KK`

### !skill [skillname]
Returns the current level of the desired skill.

### !talent [skillname] ([-Disadvantages/+Advantages])
Rolls 3 dice and compares the results of each with your current level of character attributes including your bonus on that particular skill.
`caution`: It does not yet make use of any benefits or disadvantages your character has (at the moment).

ie. `!talent klettern -2`
```
@TobenderZephyr, Du würfelst auf das Talent Klettern.
Deine Werte für MU, GE, KK sind 12, 13, 12. (Bonus: 6)
Das waren deine 🎲: 1, 16, 2. Damit hast du 3/3 Proben bestanden. Dein Bonus: 3/6.
```
### !talents
Sends the User a list of talents to use on the `!talent` command.

### !tp [attribute1] [attribute2] [attribute3] ([bonus] [-Disadvantage/+Advantages])
This command also rolls 3 dice and compares their values with entered arguments.
This one is better suited for people, who did not provide a `.tdc`-File or if one of the other numerous Advantages and/or Disadvantages need to be taken into account.

Roll with no Bonus:
`!tp 11 11 13`

Roll with a set Bonus of 4:
`!tp 12 10 11 4`

Roll with a Benefit given by the GM:
`!tp 11 10 11 0 +2`

# How to use
To connect the script to a Bot, you need to create a Bot using the Discord Developer Portal. To do this you can follow a guide like [this](https://discordpy.readthedocs.io/en/latest/discord.html).
## Docker
Just pull the docker image and you are good to go.

`docker pull tobenderzephyr/dsabot:latest`

The container needs at least the following Environment variables:
`BOT_TOKEN`: The token which you retrieve for your bot Discord Developer Portal
`CMDPREFIX`: Instead of using `!` as your prefix, you may want to use your own.

You may run the container with `docker run -rm -v ./data:/usr/src/app/data -e BOT_TOKEN=[token] -e CMDPREFIX=! tobenderzephyr/dsabot:latest`

The database is stored under `./data`, so you are good to just mount this as a volume as seen in the example above.

### docker-compose
You may aswell use a simple `docker-compose.yml` and use docker-compose for easy running the app:
```
version: "3"
services:
  dsabot:
    container_name: dsabot
    image: TobenderZephyr/dsabot:latest
    restart: unless-stopped
    environment:
      BOT_TOKEN: <YOUR TOKEN>
      CMDPREFIX: !
    volumes:
      - ./data:/usr/src/app/data
```

## manual setup

After cloning you need to install npm in the directory of the Bot. For that you need to have Node.js installed. You can install this from [here](https://nodejs.org/en/download/).

Then you need to run the following code inside of a terminal while beeing in the Bots directory:

`npm install`

Rename `.sample.env` file to `.env`
Enter the token you received on the Discord Developer Portal into the variable BOT_TOKEN inside  `.env`.


When you joined your Bot to your desired channel all you need to enter inside the bots directory:

`npm start`

Then your Bot should run and be working in your channel.

