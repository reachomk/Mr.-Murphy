"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
class Flow {
    constructor(source) {
        this.source = source;
    }
    static from(source) {
        return new Flow(source);
    }
    all(handler, event = null) {
        return functions_1.all(this.source, handler);
    }
    any(handler, event = null) {
        return functions_1.any(this.source, handler);
    }
    clone() {
        this.source = functions_1.clone(this.source);
        return this;
    }
    copy() {
        this.source = functions_1.copy(this.source);
        return this;
    }
    distinct(handler, event = null) {
        if (Array.isArray(this.source))
            this.source = functions_1.distinct(this.source, handler, event);
        return this;
    }
    each(handler, event = null) {
        functions_1.each(this.source, handler, event);
        return this;
    }
    filter(handler, event = null) {
        this.source = functions_1.filter(this.source, handler, event);
        return this;
    }
    first() {
        return functions_1.first(this.source);
    }
    fuse(source, event = null) {
        this.source = functions_1.fuse(this.source, source, event);
        return this;
    }
    group(handler, event = null) {
        if (Array.isArray(this.source))
            this.source = functions_1.group(this.source, handler, event);
        return this;
    }
    last() {
        return functions_1.last(this.source);
    }
    map(handler, event = null) {
        this.source = functions_1.map(this.source, handler, event);
        return this;
    }
    match(source, event = null) {
        return functions_1.match(this.source, source, event);
    }
    remove(object) {
        let index = functions_1.indexOf(this.source, object);
        this.removeAt(index);
        return this;
    }
    removeAt(key) {
        let item = this.source[key];
        if (Array.isArray(this.source)) {
            if (key > -1)
                this.source.splice(key, 1);
        }
        else {
            delete this.source[key];
        }
        return item;
    }
    sort(options) {
        if (Array.isArray(this.source))
            this.source = functions_1.sort(this.source, options);
        return this;
    }
    toArray() {
        return Array.isArray(this.source) ? this.source : this.map(x => x).toArray();
    }
    toMap(key, value) {
        return functions_1.index(this.source, key, value);
    }
}
exports.Flow = Flow;
//# sourceMappingURL=flow.js.map