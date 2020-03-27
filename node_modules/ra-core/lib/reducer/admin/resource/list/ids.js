"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uniq_1 = __importDefault(require("lodash/uniq"));
var dataActions_1 = require("../../../../actions/dataActions");
var getFetchedAt_1 = __importDefault(require("../../../../util/getFetchedAt"));
var dataFetchActions_1 = require("../../../../dataFetchActions");
exports.addRecordIdsFactory = function (getFetchedAtCallback) { return function (newRecordIds, oldRecordIds) {
    if (newRecordIds === void 0) { newRecordIds = []; }
    var newFetchedAt = getFetchedAtCallback(newRecordIds, oldRecordIds.fetchedAt);
    var recordIds = uniq_1.default(oldRecordIds.filter(function (id) { return !!newFetchedAt[id]; }).concat(newRecordIds));
    Object.defineProperty(recordIds, 'fetchedAt', {
        value: newFetchedAt,
    }); // non enumerable by default
    return recordIds;
}; };
var addRecordIds = exports.addRecordIdsFactory(getFetchedAt_1.default);
var idsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = []; }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === dataFetchActions_1.DELETE) {
            var index = previousState
                .map(function (el) { return el === action.payload.id; }) // eslint-disable-line eqeqeq
                .indexOf(true);
            if (index === -1) {
                return previousState;
            }
            var newState = previousState.slice(0, index).concat(previousState.slice(index + 1));
            Object.defineProperty(newState, 'fetchedAt', {
                value: previousState.fetchedAt,
            });
            return newState;
        }
        if (action.meta.fetch === dataFetchActions_1.DELETE_MANY) {
            var newState = previousState.filter(function (el) { return !action.payload.ids.includes(el); });
            Object.defineProperty(newState, 'fetchedAt', {
                value: previousState.fetchedAt,
            });
            return newState;
        }
    }
    switch (action.type) {
        case dataActions_1.CRUD_GET_LIST_SUCCESS:
            return addRecordIds(action.payload.data.map(function (_a) {
                var id = _a.id;
                return id;
            }), []);
        case dataActions_1.CRUD_GET_MANY_SUCCESS:
        case dataActions_1.CRUD_GET_MANY_REFERENCE_SUCCESS:
            return addRecordIds(action.payload.data
                .map(function (_a) {
                var id = _a.id;
                return id;
            })
                .filter(function (id) { return previousState.indexOf(id) !== -1; }), previousState);
        case dataActions_1.CRUD_GET_ONE_SUCCESS:
        case dataActions_1.CRUD_CREATE_SUCCESS:
        case dataActions_1.CRUD_UPDATE_SUCCESS:
            return addRecordIds([action.payload.data.id], previousState);
        default:
            return previousState;
    }
};
exports.default = idsReducer;
exports.getIds = function (state) { return state; };
