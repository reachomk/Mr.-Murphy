"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
function joinUserChannel(msg) {
    return new Promise((done, error) => {
        let channel = msg.member.voiceChannel;
        if (channel && channel.type === 'voice') {
            channel.join()
                .then(connection => {
                done(connection);
            });
        }
        else {
            msg.channel.send(":x: You are not in a voice channel!");
            error(`User isn't on a voice channel!`);
        }
    });
}
exports.joinUserChannel = joinUserChannel;
function secondsToTimestamp(seconds) {
    return moment()
        .startOf('day')
        .seconds(seconds)
        .format('HH:mm:ss');
}
exports.secondsToTimestamp = secondsToTimestamp;
//# sourceMappingURL=helpers.js.map