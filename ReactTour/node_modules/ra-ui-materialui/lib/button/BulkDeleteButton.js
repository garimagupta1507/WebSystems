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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var BulkDeleteWithConfirmButton_1 = __importDefault(require("./BulkDeleteWithConfirmButton"));
var BulkDeleteWithUndoButton_1 = __importDefault(require("./BulkDeleteWithUndoButton"));
var BulkDeleteButton = function (_a) {
    var undoable = _a.undoable, props = __rest(_a, ["undoable"]);
    return undoable ? (react_1.default.createElement(BulkDeleteWithUndoButton_1.default, __assign({}, props))) : (react_1.default.createElement(BulkDeleteWithConfirmButton_1.default, __assign({}, props)));
};
BulkDeleteButton.propTypes = {
    basePath: prop_types_1.default.string,
    label: prop_types_1.default.string,
    resource: prop_types_1.default.string.isRequired,
    selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any).isRequired,
    undoable: prop_types_1.default.bool,
    icon: prop_types_1.default.element,
};
BulkDeleteButton.defaultProps = {
    undoable: true,
};
exports.default = BulkDeleteButton;
