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
import { INITIALIZE_FORM, RESET_FORM, } from '../../actions/formActions';
import set from 'lodash/set';
var initialState = {};
var recordReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    if (action.type === RESET_FORM) {
        return initialState;
    }
    if (action.type === INITIALIZE_FORM) {
        return Object.keys(action.payload).reduce(function (acc, key) {
            // Ensure we correctly set default values for path with dot notation
            set(acc, key, action.payload[key]);
            return acc;
        }, __assign({}, previousState));
    }
    return previousState;
};
export default recordReducer;
