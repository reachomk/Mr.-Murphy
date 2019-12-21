# Mr. Murphy II: A Better Mr. Murphy for all of Discord.

## Description

Mr. Murphy II is a bot that can play music, send memes, and more.

## Unlisted dependencies

- `python`
- `ffmpeg` command line tool
- `node-gyp` command line tool
- `node.js` version 10.X.X or higher is recommended
- `typescript` types for javascript, enables easier group collaboration and simple right click to look up definitions

## Installation

- Install node latest stable release, this was built with node v6.11.0
- For windows run `npm install --global --production windows-build-tools`
    - Run `npm config set python python2.7`
    - Install FFMPEG from the website and add it to your system path. EX: `C:\ffmpeg\bin`
    - Run `npm install node-gyp -g`
    - Run `npm install typescript -g`
    - Run `npm install`

## Configuration

- Get a token string for your bot from by registering your bot here: [https://discordapp.com/developers](https://discordapp.com/developers)
    - You should be able to find options to invite your bot to a channel here as well
- Open `bot-config.json` and replace the content between the quotes ```"<BOT-TOKEN-HERE>"``` with your bot token.
    - In config you can add other settings, to see an example of the settings open `./src/bot/config.ts` and look at `DefaultBotConfig` and `BotConfig` for eamples
- Open `bot.log` if your looking to debug errors

## Running the Application

- Run `npm start`
