import uniq from 'lodash/uniq';
import { CRUD_GET_LIST_SUCCESS, CRUD_GET_MANY_SUCCESS, CRUD_GET_MANY_REFERENCE_SUCCESS, CRUD_GET_ONE_SUCCESS, CRUD_CREATE_SUCCESS, CRUD_UPDATE_SUCCESS, } from '../../../../actions/dataActions';
import getFetchedAt from '../../../../util/getFetchedAt';
import { DELETE, DELETE_MANY } from '../../../../dataFetchActions';
export var addRecordIdsFactory = function (getFetchedAtCallback) { return function (newRecordIds, oldRecordIds) {
    if (newRecordIds === void 0) { newRecordIds = []; }
    var newFetchedAt = getFetchedAtCallback(newRecordIds, oldRecordIds.fetchedAt);
    var recordIds = uniq(oldRecordIds.filter(function (id) { return !!newFetchedAt[id]; }).concat(newRecordIds));
    Object.defineProperty(recordIds, 'fetchedAt', {
        value: newFetchedAt,
    }); // non enumerable by default
    return recordIds;
}; };
var addRecordIds = addRecordIdsFactory(getFetchedAt);
var idsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = []; }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === DELETE) {
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
        if (action.meta.fetch === DELETE_MANY) {
            var newState = previousState.filter(function (el) { return !action.payload.ids.includes(el); });
            Object.defineProperty(newState, 'fetchedAt', {
                value: previousState.fetchedAt,
            });
            return newState;
        }
    }
    switch (action.type) {
        case CRUD_GET_LIST_SUCCESS:
            return addRecordIds(action.payload.data.map(function (_a) {
                var id = _a.id;
                return id;
            }), []);
        case CRUD_GET_MANY_SUCCESS:
        case CRUD_GET_MANY_REFERENCE_SUCCESS:
            return addRecordIds(action.payload.data
                .map(function (_a) {
                var id = _a.id;
                return id;
            })
                .filter(function (id) { return previousState.indexOf(id) !== -1; }), previousState);
        case CRUD_GET_ONE_SUCCESS:
        case CRUD_CREATE_SUCCESS:
        case CRUD_UPDATE_SUCCESS:
            return addRecordIds([action.payload.data.id], previousState);
        default:
            return previousState;
    }
};
export default idsReducer;
export var getIds = function (state) { return state; };
