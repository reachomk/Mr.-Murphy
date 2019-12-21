"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IterationEvent {
    constructor(hasOwnProperty = true, deepIteration = false) {
        this._stop = false;
        this._skip = false;
        this.hasOwnProperty = hasOwnProperty;
        this.deepIteration = deepIteration;
    }
    stop() {
        this._stop = true;
    }
    skip() {
        this._skip = true;
    }
    reset() {
        this._skip = false;
    }
}
exports.IterationEvent = IterationEvent;
class MapIterationEvent extends IterationEvent {
    constructor(hasOwnProperty = true, buildTarget = [], addToBuild = (x, y) => y.push(x)) {
        super(hasOwnProperty, false);
        this.buildTarget = buildTarget;
        this.addToBuild = addToBuild;
    }
    add(item) {
        this.addToBuild(item, this.buildTarget);
    }
}
exports.MapIterationEvent = MapIterationEvent;
class MatchIterationEvent extends IterationEvent {
    constructor(hasOwnProperty = true, deepIteration = true, explicit = false, checkType = false) {
        super(hasOwnProperty, deepIteration);
        this.explicit = false;
        this.checkType = false;
        this.explicit = explicit;
        this.checkType = checkType;
    }
}
exports.MatchIterationEvent = MatchIterationEvent;
//# sourceMappingURL=events.js.map