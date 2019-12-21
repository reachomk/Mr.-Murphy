"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotStatus {
    constructor(client) {
        this.client = client;
    }
    setBanner(status) {
        this.client.user.setPresence({
            game: {
                name: status
            }
        });
    }
    setActivity(activity) {
        this.client.user.setStatus(activity);
    }
}
exports.BotStatus = BotStatus;
//# sourceMappingURL=bot-status.js.map