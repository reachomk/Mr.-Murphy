"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_command_parser_1 = require("discord-command-parser");
const directory_1 = require("../directory");
const index_1 = require("../iteration/index");
const bot_status_1 = require("./bot-status");
const command_map_1 = require("./command-map");
const config_1 = require("./config");
const console_reader_1 = require("./console-reader");
const helpers_1 = require("./helpers");
const logger_1 = require("./logger");
const media_1 = require("./media");
const random = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};
const pingPhrases = [
    `Can't stop won't stop!`,
    `:ping_pong: Pong Bitch!`
];
class Bot {
    constructor(client, config) {
        this.base_client = client;
        this.online = false;
        this.config = index_1.fuse(index_1.clone(config_1.DefaultBotConfig), config);
        this.commands = new command_map_1.CommandMap()
            .on('ping', (cmd, msg) => {
            let phrases = pingPhrases.slice();
            if (msg.guild)
                phrases = phrases.concat(msg.guild.emojis.array().map(x => x.name));
            msg.channel.send(random(phrases));
        })
            .on('join', (cmd, msg) => {
            helpers_1.joinUserChannel(msg)
                .then(connection => {
                this.player.connection = connection;
                msg.channel.send(`:speaking_head: Joined channel: ${connection.channel.name}`);
                if (this.config.auto.play)
                    this.player.play();
            })
                .catch(err => {
                msg.channel.send(err);
            });
        })
            .on('leave', (cmd, msg) => {
            this.player.stop();
            this.player.connection = null;
            this.client.voiceConnections.forEach(conn => {
                conn.disconnect();
                msg.channel.send(`:mute: Disconnecting from channel: ${conn.channel.name}`);
            });
        })
            .on('play', (cmd, msg) => {
            new Promise(done => {
                if (!this.player.connection) {
                    helpers_1.joinUserChannel(msg)
                        .then(conn => {
                        this.player.connection = conn;
                        msg.channel.send(`:speaking_head: Joined channel: ${conn.channel.name}`);
                        done();
                    });
                }
                else
                    done();
            }).then(() => {
                this.player.play();
            });
        })
            .on('pause', (cmd, msg) => {
            this.player.pause();
        })
            .on('time', (cmd, msg) => {
            let media = this.player.queue.first;
            if (this.player.playing && this.player.dispatcher) {
                let elapsed = helpers_1.secondsToTimestamp(this.player.dispatcher.totalStreamTime / 1000);
                msg.channel.send(`${elapsed} / ${media.duration}`);
            }
            else if (this.player.queue.first) {
                msg.channel.send(`00:00:00 / ${media.duration}`);
            }
        })
            .on('add', (cmd, msg) => {
            if (cmd.arguments.length > 0) {
                cmd.arguments.forEach(arg => {
                    let parts = arg.split(':');
                    if (parts.length == 2) {
                        this.player.addMedia({ type: parts[0], url: parts[1], requestor: msg.author.username });
                    }
                    else
                        msg.channel.send(`Invalid type format`);
                });
            }
        })
            .on('remove', (cmd, msg) => {
            if (cmd.arguments.length > 0) {
                let idx = parseInt(cmd.arguments[0]);
                let item = this.player.at(idx - 1);
                if (item) {
                    this.player.remove(item);
                }
            }
        })
            .on('skip', (cmd, msg) => {
            this.player.skip();
        })
            .on('stop', (cmd, msg) => {
            this.player.stop();
        })
            .on('queue', (cmd, msg) => {
            let items = this.player.queue
                .map((item, idx) => `${idx + 1}. Type: "${item.type}", Title: "${item.name}${item.requestor ? `", Requested By: ${item.requestor}` : ''}"`);
            if (items.length > 0)
                msg.channel.send(items.join('\n'));
            else
                msg.channel.send(`:cd: There are no songs in the queue.`);
        })
            .on('clear', (cmd, msg) => {
            this.player.clear();
        })
            .on('move', (cmd, msg) => {
            if (cmd.arguments.length > 1) {
                let current = Math.min(Math.max(parseInt(cmd.arguments[0]), 0), this.player.queue.length - 1), targetDesc = cmd.arguments[0], target = 0;
                if (targetDesc == 'up')
                    target = Math.min(current - 1, 0);
                else if (targetDesc == 'down')
                    target = Math.max(current + 1, this.player.queue.length - 1);
                else
                    target = parseInt(targetDesc);
                this.player.move(current, target);
            }
        })
            .on('shuffle', (cmd, msg) => {
            this.player.shuffle();
        })
            .on('volume', (cmd, msg) => {
            if (cmd.arguments.length > 0) {
                let temp = cmd.arguments[0];
                if (temp) {
                    let volume = Math.min(Math.max(parseInt(temp), 0), 100);
                    this.player.setVolume(volume);
                }
            }
            msg.channel.send(`:speaker: Volume is at ${this.player.getVolume()}`);
        })
            .on('repeat', (cmd, msg) => {
            this.config.queue.repeat = !this.config.queue.repeat;
            msg.channel.send(`Repeat mode is ${this.config.queue.repeat ? 'on' : 'off'}`);
        });
        this.client = this.base_client
            .on('message', (msg) => {
            let parsed = discord_command_parser_1.parse(msg, this.config.command.symbol);
            if (!parsed.success)
                return;
            let handlers = this.commands.get(parsed.command);
            if (handlers) {
                logger_1.logger.debug(`Bot Command: ${msg.content}`);
                // TODO make the player able to handle multiple channels
                this.player.channel = msg.channel;
                handlers.forEach(handle => {
                    handle(parsed, msg);
                });
            }
        })
            .on('ready', () => {
            if (this.online)
                logger_1.logger.debug('Reconnected!');
            else
                logger_1.logger.debug('Rhythm Bot Online!');
            this.online = true;
            this.player.determineStatus();
        })
            .on('reconnecting', () => {
            logger_1.logger.debug('Reconnecting...');
        })
            .on('disconnect', () => {
            this.online = false;
            logger_1.logger.debug('Disconnected!');
        })
            .on('error', (error) => {
            logger_1.logger.error(error);
        })
            .on('guildMemberUpdate', () => {
        })
            .on('guildMemberSpeaking', () => {
        });
        this.console = new console_reader_1.ConsoleReader();
        this.console.commands
            .on('exit', (args, rl) => {
            if (this.client)
                this.client.destroy();
            rl.close();
        });
        this.status = new bot_status_1.BotStatus(this.client);
        this.player = new media_1.MediaPlayer(this.config, this.status);
        let files = directory_1.readDir('./dist/plugins');
        if (files) {
            this.plugins = files
                .filter(file => !file.includes('.map'))
                .map(file => directory_1.requireFile('./dist/plugins', file).default)
                .map(construct => new construct());
            this.plugins.forEach(plugin => plugin.preInitialize(this));
            this.plugins.forEach(plugin => plugin.postInitialize(this));
        }
    }
    connect() {
        return this.client.login(this.config.discord.token);
    }
    listen() {
        return this.console.listen();
    }
}
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map