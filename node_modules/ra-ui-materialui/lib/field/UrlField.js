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
var get_1 = __importDefault(require("lodash/get"));
var pure_1 = __importDefault(require("recompose/pure"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var types_1 = require("./types");
var UrlField = function (_a) {
    var className = _a.className, source = _a.source, _b = _a.record, record = _b === void 0 ? {} : _b, rest = __rest(_a, ["className", "source", "record"]);
    return (react_1.default.createElement("a", __assign({ className: className, href: get_1.default(record, source) }, sanitizeRestProps_1.default(rest)), get_1.default(record, source)));
};
var EnhancedUrlField = pure_1.default(UrlField);
EnhancedUrlField.defaultProps = {
    addLabel: true,
};
EnhancedUrlField.propTypes = types_1.fieldPropTypes;
EnhancedUrlField.displayName = 'EnhancedUrlField';
exports.default = EnhancedUrlField;
