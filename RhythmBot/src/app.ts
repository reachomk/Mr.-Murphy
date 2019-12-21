
import { requireFile, logger, BotConfig, Bot } from './resources';

let config: BotConfig = requireFile('./bot-config.json');

// Add tokens and API Keys via ENV (needed for heroku)
config.discord.token = process.env.DISCORD_TOKEN;
config.youtube.apikey = process.env.YOUTUBE_KEY;

function start(client) {
  let bot = new Bot(client, config);
  bot.connect()
      .then(() => {
          logger.debug('Bot Ready');
          console.log('Bot Online');
          bot.listen();
      })
      .catch(err => logger.error(err));
}

module.exports.start = start;
