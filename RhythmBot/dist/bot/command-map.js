"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandMap extends Map {
    on(cmd, handler) {
        if (!this.has(cmd))
            this.set(cmd, [handler]);
        else
            this.get(cmd).push(handler);
        return this;
    }
    off(cmd, handler) {
        if (!handler) {
            this.delete(cmd);
        }
        else {
            let array = this.get(cmd);
            if (array) {
                let idx = array.indexOf(handler);
                if (idx > -1)
                    array.splice(idx, 1);
            }
        }
        return this;
    }
}
exports.CommandMap = CommandMap;
//# sourceMappingURL=command-map.js.map