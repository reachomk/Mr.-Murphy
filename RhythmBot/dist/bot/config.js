"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultBotConfig = {
    auto: {
        deafen: false,
        pause: false,
        play: false,
        reconnect: true
    },
    discord: {
        token: '<BOT-TOKEN>',
        log: true
    },
    youtube: {
        apikey: '<YT-KEY>',
        log: true
    },
    command: {
        symbol: '!'
    },
    queue: {
        announce: true,
        repeat: false
    },
    stream: {
        seek: 0,
        passes: 3,
        volume: 1,
        bitrate: 'auto'
    }
};
//# sourceMappingURL=config.js.map