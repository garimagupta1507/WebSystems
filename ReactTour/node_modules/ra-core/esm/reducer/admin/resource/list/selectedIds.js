import { SET_LIST_SELECTED_IDS, TOGGLE_LIST_ITEM, } from '../../../../actions/listActions';
import { DELETE, DELETE_MANY } from '../../../../dataFetchActions';
var initialState = [];
var selectedIdsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    if (action.type === SET_LIST_SELECTED_IDS) {
        return action.payload;
    }
    if (action.type === TOGGLE_LIST_ITEM) {
        var index = previousState.indexOf(action.payload);
        if (index > -1) {
            return previousState.slice(0, index).concat(previousState.slice(index + 1));
        }
        else {
            return previousState.concat([action.payload]);
        }
    }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === DELETE) {
            var index = previousState.indexOf(action.payload.id);
            if (index === -1) {
                return previousState;
            }
            return previousState.slice(0, index).concat(previousState.slice(index + 1));
        }
        if (action.meta.fetch === DELETE_MANY) {
            return previousState.filter(function (id) { return !action.payload.ids.includes(id); });
        }
    }
    return action.meta && action.meta.unselectAll
        ? initialState
        : previousState;
};
export default selectedIdsReducer;
