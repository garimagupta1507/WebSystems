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
var compose_1 = __importDefault(require("recompose/compose"));
var get_1 = __importDefault(require("lodash/get"));
var pure_1 = __importDefault(require("recompose/pure"));
var Chip_1 = __importDefault(require("@material-ui/core/Chip"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var types_1 = require("./types");
var styles = styles_1.createStyles({
    chip: { margin: 4 },
});
exports.ChipField = function (_a) {
    var className = _a.className, classes = _a.classes, source = _a.source, _b = _a.record, record = _b === void 0 ? {} : _b, rest = __rest(_a, ["className", "classes", "source", "record"]);
    return (react_1.default.createElement(Chip_1.default, __assign({ className: classnames_1.default(classes.chip, className), label: get_1.default(record, source) }, sanitizeRestProps_1.default(rest))));
};
var EnhancedChipField = compose_1.default(styles_1.withStyles(styles), pure_1.default)(exports.ChipField);
EnhancedChipField.defaultProps = {
    addLabel: true,
};
EnhancedChipField.propTypes = __assign({}, exports.ChipField.propTypes, types_1.fieldPropTypes);
EnhancedChipField.displayName = 'EnhancedChipField';
exports.default = EnhancedChipField;
