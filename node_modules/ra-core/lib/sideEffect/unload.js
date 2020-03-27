"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable require-yield */
var effects_1 = require("redux-saga/effects");
var undoActions_1 = require("../actions/undoActions");
/**
 * Unload saga
 *
 * When a user closes the browser window while an optimistic update/delete
 * hasn't been sent to the dataProvider yet, warn them that their edits
 * may be lost.
 *
 * To achieve that, this saga registers a window event handler on the
 * 'beforeunload' event when entering the optimistic mode, and removes
 * the event when quitting the optimistic mode.
 */
function watchUnload() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(undoActions_1.START_OPTIMISTIC_MODE, handleStartOptimistic)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.takeEvery(undoActions_1.STOP_OPTIMISTIC_MODE, handleStopOptimisticMode)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.default = watchUnload;
var eventListener = function (event) {
    event.preventDefault(); // standard
    event.returnValue = ''; // Chrome
    return 'Your latest modifications are not yet sent to the server. Are you sure?'; // Old IE
};
function handleStartOptimistic() {
    return __generator(this, function (_a) {
        // SSR escape hatch
        if (!window) {
            return [2 /*return*/];
        }
        window.addEventListener('beforeunload', eventListener);
        return [2 /*return*/];
    });
}
exports.handleStartOptimistic = handleStartOptimistic;
function handleStopOptimisticMode() {
    return __generator(this, function (_a) {
        // SSR escape hatch
        if (!window) {
            return [2 /*return*/];
        }
        window.removeEventListener('beforeunload', eventListener);
        return [2 /*return*/];
    });
}
exports.handleStopOptimisticMode = handleStopOptimisticMode;
