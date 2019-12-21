"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("./resources");
let config = resources_1.requireFile('./bot-config.json');
// Add tokens and API Keys via ENV (needed for heroku)
config.discord.token = process.env.DISCORD_TOKEN;
config.youtube.apikey = process.env.YOUTUBE_KEY;
function start(client) {
    let bot = new resources_1.Bot(client, config);
    bot.connect()
        .then(() => {
        resources_1.logger.debug('Bot Ready');
        console.log('Bot Online');
        bot.listen();
    })
        .catch(err => resources_1.logger.error(err));
}
module.exports.start = start;
//# sourceMappingURL=app.js.map