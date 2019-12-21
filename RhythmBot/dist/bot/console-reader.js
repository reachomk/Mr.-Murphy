"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_map_1 = require("./command-map");
const logger_1 = require("./logger");
const readline = require("readline");
const minimist = require("minimist");
class ConsoleReader {
    constructor() {
        this.commands = new command_map_1.CommandMap();
    }
    listen() {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on('line', input => {
            if (!input)
                return;
            let parts = input.split(' ');
            let result = minimist(parts);
            if (this.commands.has(result._[0])) {
                let cmds = this.commands.get(result._[0]);
                cmds.forEach(cmd => cmd(result, rl));
            }
        });
        rl.on('close', () => {
            logger_1.logger.debug('Console Reader Disconnected');
        });
    }
}
exports.ConsoleReader = ConsoleReader;
//# sourceMappingURL=console-reader.js.map