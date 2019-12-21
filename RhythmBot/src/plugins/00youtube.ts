import { ParsedMessage } from 'discord-command-parser';
import { Message } from 'discord.js';
import { secondsToTimestamp } from '../bot';
import { IBot, IBotPlugin, MediaItem } from '../resources';
import { BotConfig } from '../bot/config';
import * as ytdl from 'ytdl-core';
import { YTSearcher, apiurl } from 'ytsearcher';

const youtubeType = "youtube";

export default class YoutubePlugin implements IBotPlugin {
  searcher: YTSearcher;

  preInitialize(bot: IBot): void {
    // initialize the ytsearcher first just in case
    this.searcher = new YTSearcher({
      key: bot.config.youtube.apikey,
      revealkey: false
    });

    const player = bot.player;

    bot.commands.on(youtubeType, (cmd: ParsedMessage, msg: Message) => {
      console.log("Youtube query with arguments ", cmd.arguments);
      if(cmd.arguments.length > 0) {
        if (cmd.arguments[0].startsWith("http")) {
          // Direct URL, no need to query api
          cmd.arguments.forEach(arg => {
            player.addMedia({ type: youtubeType, url: arg, requestor: msg.author.username });
          });
        } else {
          // Search using the API
          let search = async () => {
            console.log("Searching with API");
            let result = await this.searcher.search(cmd.arguments.join(" "))
            player.addMedia({ type: youtubeType, url: result.first.url, requestor: msg.author.username });
          };

          msg.channel.send(`\`Searching for: ${cmd.arguments.join(" ")}\``)
          search();
        }
      }
    });

    // adds a new media type to the player type registry.
    // tbh not sure how this works so no touchy i guess
    player.typeRegistry.set(
      youtubeType,
      {
        getDetails: (item: MediaItem) => new Promise((done, error) => {
          console.log("Processing URL ", '"'+item.url+'"');
          let result = ytdl.getInfo(item.url, (err, info) => {
            if(info) {
              item.name = info.title ? info.title : 'Unknown';
              item.duration = secondsToTimestamp(parseInt(info.length_seconds) || 0);
              done(item);
            } else
              error(err);
          });
        }),

        getStream: (item: MediaItem) => new Promise((done, error) => {
          let stream = ytdl(item.url, { filter: 'audioonly' });
          if(stream)
            done(stream);
          else
            error('Unable to get media stream');
        })
      }
    );
 }

 postInitialize(bot: IBot): void {

 }

}
