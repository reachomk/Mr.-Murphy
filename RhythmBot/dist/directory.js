"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const jsonfile_1 = require("jsonfile");
exports.directory = path.resolve(__dirname, '..');
exports.projectDir = (...args) => {
    return path.resolve(exports.directory, ...args);
};
exports.readJson = (...args) => {
    return jsonfile_1.readFileSync(exports.projectDir(...args), { encoding: 'utf8' });
};
exports.requireFile = (...args) => {
    return require(exports.projectDir(...args));
};
exports.readFile = (...args) => {
    return fs.readFileSync(exports.projectDir(...args), { encoding: 'utf8' });
};
exports.readDir = (...args) => {
    return fs.readdirSync(exports.projectDir(...args));
};
exports.writeFile = (data, ...args) => {
    return fs.writeFileSync(exports.projectDir(...args), data, { encoding: 'utf8' });
};
exports.writeJson = (data, ...args) => {
    return jsonfile_1.writeFileSync(exports.projectDir(...args), data, { encoding: 'utf8' });
};
exports.appendFile = (data, ...args) => {
    return fs.appendFileSync(exports.projectDir(...args), data, { encoding: 'utf8' });
};
exports.fileExists = (...args) => {
    return fs.existsSync(exports.projectDir(...args));
};
exports.deleteFile = (...args) => {
    let filepath = exports.projectDir(...args);
    if (!fs.existsSync(filepath))
        return;
    return fs.unlinkSync(filepath);
};
//# sourceMappingURL=directory.js.map