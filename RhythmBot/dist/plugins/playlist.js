"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("../resources");
const playlistDir = './playlists';
class PlaylistPlugin {
    preInitialize(bot) {
        bot.commands.on('playlist', (cmd, msg) => {
            switch (cmd.arguments[0]) {
                case 'load':
                    this.load(cmd, msg, bot);
                    break;
                case 'save':
                    this.save(cmd, msg, bot);
                    break;
                case 'delete':
                    this.delete(cmd, msg, bot);
                    break;
                default:
                    this.list(cmd, msg, bot);
                    break;
            }
        });
    }
    postInitialize(bot) {
    }
    list(cmd, msg, bot) {
        let files = resources_1.readDir(playlistDir)
            .filter(file => file.includes('.json'))
            .map((file, i) => `${i + 1}. ${file.replace('.json', '')}`);
        msg.channel.send(`Playlists: \n\n${files.length == 0 ? 'No Playlists' : files.join('\n')}`);
    }
    load(cmd, msg, bot) {
        let name = cmd.arguments[1];
        if (name) {
            let queue = resources_1.readJson(playlistDir, `${name}.json`) || { list: [] };
            if (queue.list) {
                if (cmd.arguments[2] == 'append') {
                    bot.player.queue.push(...queue.list);
                }
                else {
                    bot.player.clear();
                    bot.player.queue.push(...queue.list);
                }
                bot.player.determineStatus();
                msg.channel.send(`Loaded Playlist "${name}"`);
            }
        }
    }
    save(cmd, msg, bot) {
        let name = cmd.arguments[1];
        if (name) {
            let queue = { list: bot.player.queue.map(x => x) };
            if (queue.list.length > 0) {
                resources_1.writeJson(queue, playlistDir, `${name}.json`);
            }
            msg.channel.send(`Saved Playlist "${name}"`);
        }
    }
    delete(cmd, msg, bot) {
        let name = cmd.arguments[1];
        if (name && resources_1.fileExists(playlistDir, `${name}.json`)) {
            resources_1.deleteFile(playlistDir, `${name}.json`);
            msg.channel.send(`Deleted Playlist "${name}"`);
        }
    }
}
exports.default = PlaylistPlugin;
//# sourceMappingURL=playlist.js.map