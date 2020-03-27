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
import { FETCH_END } from '../../../actions/fetchActions';
import { CREATE, DELETE, DELETE_MANY, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, UPDATE, UPDATE_MANY, } from '../../../dataFetchActions';
import getFetchedAt from '../../../util/getFetchedAt';
/**
 * Make the fetchedAt property non enumerable
 */
export var hideFetchedAt = function (records) {
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
export var addRecords = function (newRecords, oldRecords) {
    if (newRecords === void 0) { newRecords = []; }
    var newRecordsById = {};
    newRecords.forEach(function (record) { return (newRecordsById[record.id] = record); });
    var newFetchedAt = getFetchedAt(newRecords.map(function (_a) {
        var id = _a.id;
        return id;
    }), oldRecords.fetchedAt);
    var records = { fetchedAt: newFetchedAt };
    Object.keys(newFetchedAt).forEach(function (id) { return (records[id] = newRecordsById[id] || oldRecords[id]); });
    return hideFetchedAt(records);
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
    return hideFetchedAt(records);
};
var initialState = hideFetchedAt({ fetchedAt: {} });
var dataReducer = function (previousState, _a) {
    if (previousState === void 0) { previousState = initialState; }
    var payload = _a.payload, meta = _a.meta;
    if (meta && meta.optimistic) {
        if (meta.fetch === UPDATE) {
            var updatedRecord = __assign({}, previousState[payload.id], payload.data);
            return addRecords([updatedRecord], previousState);
        }
        if (meta.fetch === UPDATE_MANY) {
            var updatedRecords = payload.ids.map(function (id) { return (__assign({}, previousState[id], payload.data)); });
            return addRecords(updatedRecords, previousState);
        }
        if (meta.fetch === DELETE) {
            return removeRecords([payload.id], previousState);
        }
        if (meta.fetch === DELETE_MANY) {
            return removeRecords(payload.ids, previousState);
        }
    }
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== FETCH_END) {
        return previousState;
    }
    switch (meta.fetchResponse) {
        case GET_LIST:
        case GET_MANY:
        case GET_MANY_REFERENCE:
            return addRecords(payload.data, previousState);
        case GET_ONE:
        case UPDATE:
        case CREATE:
            return addRecords([payload.data], previousState);
        default:
            return previousState;
    }
};
export var getRecord = function (state, id) { return state[id]; };
export default dataReducer;
