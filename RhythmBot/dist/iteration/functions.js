"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
function each(target, handler, event = null) {
    event = event || new events_1.IterationEvent();
    if (Array.isArray(target) || typeof target === 'string') {
        let length = target.length;
        for (let i = 0; i < length; i++) {
            handler(target[i], i, event);
            if (event.deepIteration && !event._stop && !event._skip && (Array.isArray(target[i]) || typeof target[i] === 'object'))
                each(target[i], handler, event);
            if (event._stop)
                break;
        }
    }
    else if (typeof target === 'number') {
        let count = 0, goal = Math.abs(target);
        while (count < target) {
            count++;
            handler(count, goal, event);
            if (event._stop)
                break;
        }
    }
    else {
        for (let i in target) {
            if (!event.hasOwnProperty || target.hasOwnProperty(i)) {
                handler(target[i], i, event);
                if (event.deepIteration && !event._stop && !event._skip && (Array.isArray(target[i]) || typeof target[i] === 'object'))
                    each(target[i], handler, event);
                if (event._stop)
                    break;
            }
        }
    }
}
exports.each = each;
function filter(target, handler, event = null) {
    event = event || new events_1.IterationEvent();
    let result = null;
    if (Array.isArray(target)) {
        result = [];
        each(target, (x, y, z) => {
            if (handler(x, y, z))
                result.push(x);
        }, event);
    }
    else {
        result = {};
        each(target, (x, y, z) => {
            if (handler(x, y, z))
                result[y] = x;
        }, event);
    }
    return result;
}
exports.filter = filter;
function map(target, handler, event = null) {
    let temp = null;
    event = event || new events_1.MapIterationEvent(true, (item, build) => build.push(item));
    each(target, (x, y, z) => {
        temp = handler(x, y, z);
        if (!event._skip)
            event.add(temp);
    }, event);
    return event.buildTarget;
}
exports.map = map;
function index(target, key, value) {
    let map = new Map(), keyFunc = key || function (x, y) { return y; }, valueFunc = value || function (x, y) { return x; }, keyVal, valueVal;
    each(target, (x, y) => {
        keyVal = keyFunc(x, y);
        valueVal = valueFunc(x, y);
        if (!map.has(keyVal))
            map.set(keyVal, valueVal);
    });
    return map;
}
exports.index = index;
function sort(target, options) {
    options = Array.isArray(options) ? options : [options];
    let temp = target.slice(), len = options.length, rev, result, A, B, i, opt;
    options.forEach(x => {
        x.dir = x.dir || 'asc';
        x.key = x.key || function (x) { return x; };
    });
    return temp.sort(function (a, b) {
        for (i = 0; i < len; i++) {
            opt = options[i];
            rev = opt.dir == 'asc';
            result = 0;
            A = opt.key(a);
            B = opt.key(b);
            result = (A < B ? -1 : A > B ? 1 : 0) * [-1, 1][+!!rev];
            if (result != 0)
                break;
        }
        return result;
    });
}
exports.sort = sort;
function find(target, handler, event = null) {
    let retval = null, flag = false;
    event = event || new events_1.IterationEvent();
    each(target, (x, y, z) => {
        flag = handler(x, y, z);
        if (flag) {
            z.stop();
            retval = x;
        }
    }, event);
    return retval;
}
exports.find = find;
function indexOf(target, obj) {
    let retval = null, flag = false;
    if (Array.isArray(target))
        retval = target.indexOf(obj);
    else {
        each(target, (x, y, z) => {
            if (x == obj) {
                z.stop();
                retval = y;
            }
        });
    }
    return retval;
}
exports.indexOf = indexOf;
function contains(target, handler, event = null) {
    return find(target, handler, event) != null;
}
exports.contains = contains;
function fuse(target, source, event = null) {
    event = event || new events_1.IterationEvent(true, true);
    each(source, (object, key) => {
        if (object && object._iter_tag === 'updateable')
            object.update(target, true);
        else {
            if (event.deepIteration && (Array.isArray(object) || typeof object === 'object')) {
                if (!target[key]) {
                    if (typeof object === 'object')
                        target[key] = {};
                    else if (Array.isArray(object))
                        target[key] = [];
                }
                fuse(target[key], object, event);
            }
            else
                target[key] = object;
        }
    });
    return target;
}
exports.fuse = fuse;
function distinct(target, handler, event = null) {
    let hash = new Set(), value = null;
    event = event || new events_1.IterationEvent();
    return filter(target, (x, y, z) => {
        value = handler(x, y, z);
        if (hash.has(value))
            return false;
        hash.add(value);
        return true;
    }, event);
}
exports.distinct = distinct;
function group(target, key, event) {
    let map = new Map(), value = null;
    event = event || new events_1.IterationEvent();
    each(target, (x, y, z) => {
        value = key(x, y, z);
        if (!map.has(value))
            map.set(value, []);
        map.get(value).push(x);
    });
    return map;
}
exports.group = group;
function first(target) {
    if (Array.isArray(target)) {
        return target[0];
    }
    else {
        let item = null;
        for (let i in target) {
            item = target[i];
            break;
        }
        return item;
    }
}
exports.first = first;
function last(target) {
    if (Array.isArray(target)) {
        return target[target.length - 1];
    }
    else {
        let item = null;
        for (let i in target) {
            item = target[i];
        }
        return item;
    }
}
exports.last = last;
function any(target, handler, event = null) {
    let state = false;
    event = event || new events_1.IterationEvent();
    each(target, (x, y, z) => {
        if (handler(x, y, z)) {
            state = true;
            z.stop();
        }
    }, event);
    return state;
}
exports.any = any;
function all(target, handler, event = null) {
    let state = true;
    event = event || new events_1.IterationEvent();
    each(target, (x, y, z) => {
        if (!handler(x, y, z)) {
            state = false;
            z.stop();
        }
    }, event);
    return state;
}
exports.all = all;
function match(target1, target2, event = null) {
    let flag = true;
    event = event || new events_1.MatchIterationEvent();
    if (event.checkType && (typeof target1 != typeof target2))
        return false;
    if ((!target1 && target2) || (target1 && !target2))
        return false;
    each(target1, (x, y, z) => {
        if (event.deepIteration && (Array.isArray(x) || typeof x === 'object')) {
            if (!match(x, target2[y], event)) {
                z.stop();
                flag = false;
            }
        }
        else if (event.explicit ? target2[y] !== x : target2[y] != x) {
            z.stop();
            flag = false;
        }
    });
    return flag;
}
exports.match = match;
function copy(target) {
    return fuse(Array.isArray(target) ? [] : {}, target);
}
exports.copy = copy;
function clone(target) {
    return JSON.parse(JSON.stringify(target));
}
exports.clone = clone;
//# sourceMappingURL=functions.js.map