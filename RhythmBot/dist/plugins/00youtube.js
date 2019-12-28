"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("../bot");
const ytdl = require("ytdl-core");
const ytsearcher_1 = require("ytsearcher");
const youtubeType = "youtube";
class YoutubePlugin {
    preInitialize(bot) {
        // initialize the ytsearcher first just in case
        this.searcher = new ytsearcher_1.YTSearcher({
            key: bot.config.youtube.apikey,
            revealkey: false
        });
        const player = bot.player;
        bot.commands.on(youtubeType, (cmd, msg) => {
            console.log("Youtube query with arguments ", cmd.arguments);
            if (cmd.arguments.length > 0) {
                if (cmd.arguments[0].startsWith("http")) {
                    // Direct URL, no need to query api
                    cmd.arguments.forEach(arg => {
                        player.addMedia({ type: youtubeType, url: arg, requestor: msg.author.username });
                    });
                }
                else {
                    // Search using the API
                    let search = () => __awaiter(this, void 0, void 0, function* () {
                        console.log("Searching with API");
                        let result = yield this.searcher.search(cmd.arguments.join(" "));
                        player.addMedia({ type: youtubeType, url: result.first.url, requestor: msg.author.username });
                    });
                    msg.channel.send(`\`Searching for: ${cmd.arguments.join(" ")}\``);
                    search();
                }
            }
        });
        // adds a new media type to the player type registry.
        // tbh not sure how this works so no touchy i guess
        player.typeRegistry.set(youtubeType, {
            getDetails: (item) => new Promise((done, error) => {
                console.log("Processing URL ", '"' + item.url + '"');
                let result = ytdl.getInfo(item.url, (err, info) => {
                    if (info) {
                        item.name = info.title ? info.title : 'Unknown';
                        item.duration = bot_1.secondsToTimestamp(parseInt(info.length_seconds) || 0);
                        done(item);
                    }
                    else
                        error(err);
                });
            }),
            getStream: (item) => new Promise((done, error) => {
                let stream = ytdl(item.url, { filter: 'audioonly' });
                if (stream)
                    done(stream);
                else
                    error('Unable to get media stream');
            })
        });
    }
    postInitialize(bot) {
    }
}
exports.default = YoutubePlugin;
//# sourceMappingURL=00youtube.js.map