"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetchActions_1 = require("../../../actions/fetchActions");
var dataFetchActions_1 = require("../../../dataFetchActions");
var getFetchedAt_1 = __importDefault(require("../../../util/getFetchedAt"));
/**
 * Make the fetchedAt property non enumerable
 */
exports.hideFetchedAt = function (records) {
    Object.defineProperty(records, 'fetchedAt', {
        enumerable: false,
        configurable: false,
        writable: false,
    });
    return records;
};
/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
exports.addRecords = function (newRecords, oldRecords) {
    if (newRecords === void 0) { newRecords = []; }
    var newRecordsById = {};
    newRecords.forEach(function (record) { return (newRecordsById[record.id] = record); });
    var newFetchedAt = getFetchedAt_1.default(newRecords.map(function (_a) {
        var id = _a.id;
        return id;
    }), oldRecords.fetchedAt);
    var records = { fetchedAt: newFetchedAt };
    Object.keys(newFetchedAt).forEach(function (id) { return (records[id] = newRecordsById[id] || oldRecords[id]); });
    return exports.hideFetchedAt(records);
};
/**
 * Remove records from the pool
 */
var removeRecords = function (removedRecordIds, oldRecords) {
    if (removedRecordIds === void 0) { removedRecordIds = []; }
    var records = Object.entries(oldRecords)
        .filter(function (_a) {
        var key = _a[0];
        return !removedRecordIds.includes(key);
    })
        .reduce(function (obj, _a) {
        var key = _a[0], val = _a[1];
        var _b;
        return (__assign({}, obj, (_b = {}, _b[key] = val, _b)));
    }, {
        fetchedAt: {},
    });
    records.fetchedAt = Object.entries(oldRecords.fetchedAt)
        .filter(function (_a) {
        var key = _a[0];
        return !removedRecordIds.includes(key);
    })
        .reduce(function (obj, _a) {
        var key = _a[0], val = _a[1];
        var _b;
        return (__assign({}, obj, (_b = {}, _b[key] = val, _b)));
    }, {});
    return exports.hideFetchedAt(records);
};
var initialState = exports.hideFetchedAt({ fetchedAt: {} });
var dataReducer = function (previousState, _a) {
    if (previousState === void 0) { previousState = initialState; }
    var payload = _a.payload, meta = _a.meta;
    if (meta && meta.optimistic) {
        if (meta.fetch === dataFetchActions_1.UPDATE) {
            var updatedRecord = __assign({}, previousState[payload.id], payload.data);
            return exports.addRecords([updatedRecord], previousState);
        }
        if (meta.fetch === dataFetchActions_1.UPDATE_MANY) {
            var updatedRecords = payload.ids.map(function (id) { return (__assign({}, previousState[id], payload.data)); });
            return exports.addRecords(updatedRecords, previousState);
        }
        if (meta.fetch === dataFetchActions_1.DELETE) {
            return removeRecords([payload.id], previousState);
        }
        if (meta.fetch === dataFetchActions_1.DELETE_MANY) {
            return removeRecords(payload.ids, previousState);
        }
    }
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== fetchActions_1.FETCH_END) {
        return previousState;
    }
    switch (meta.fetchResponse) {
        case dataFetchActions_1.GET_LIST:
        case dataFetchActions_1.GET_MANY:
        case dataFetchActions_1.GET_MANY_REFERENCE:
            return exports.addRecords(payload.data, previousState);
        case dataFetchActions_1.GET_ONE:
        case dataFetchActions_1.UPDATE:
        case dataFetchActions_1.CREATE:
            return exports.addRecords([payload.data], previousState);
        default:
            return previousState;
    }
};
exports.getRecord = function (state, id) { return state[id]; };
exports.default = dataReducer;
