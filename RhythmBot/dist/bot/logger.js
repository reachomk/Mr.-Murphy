"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const directory_1 = require("../directory");
const winston_1 = require("winston");
const { Console, File } = winston_1.transports;
const { combine, timestamp, printf } = winston_1.format;
const lineFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] (${level}): ${message}`;
});
const logger = winston_1.createLogger({
    level: 'silly',
    format: combine(timestamp(), lineFormat),
    transports: [
        new Console(),
        new File({ filename: 'bot.log', dirname: directory_1.directory, maxsize: 1e+7 })
    ]
});
exports.logger = logger;
//# sourceMappingURL=logger.js.map