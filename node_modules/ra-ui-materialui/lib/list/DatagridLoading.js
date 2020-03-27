"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Table_1 = __importDefault(require("@material-ui/core/Table"));
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
var TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
var TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@material-ui/core/styles");
var RawPlaceholder = function (_a) {
    var classes = _a.classes;
    return (react_1.default.createElement("div", { className: classes.root }, "\u00A0"));
};
var styles = function (theme) {
    return styles_1.createStyles({
        root: {
            backgroundColor: theme.palette.grey[300],
            display: 'flex',
        },
    });
};
var Placeholder = styles_1.withStyles(styles)(RawPlaceholder);
var times = function (nbChildren, fn) {
    return Array.from({ length: nbChildren }, function (_, key) { return fn(key); });
};
exports.default = (function (_a) {
    var classes = _a.classes, className = _a.className, expand = _a.expand, hasBulkActions = _a.hasBulkActions, nbChildren = _a.nbChildren, _b = _a.nbFakeLines, nbFakeLines = _b === void 0 ? 5 : _b;
    return (react_1.default.createElement(Table_1.default, { className: classnames_1.default(classes.table, className) },
        react_1.default.createElement(TableHead_1.default, null,
            react_1.default.createElement(TableRow_1.default, { className: classes.row },
                expand && react_1.default.createElement(TableCell_1.default, { className: classes.expandHeader }),
                hasBulkActions && (react_1.default.createElement(TableCell_1.default, { padding: "none", className: classes.expandIconCell },
                    react_1.default.createElement(Checkbox_1.default, { className: "select-all", color: "primary", checked: false }))),
                times(nbChildren, function (key) { return (react_1.default.createElement(TableCell_1.default, { padding: "none", variant: "head", className: classes.headerCell, key: key },
                    react_1.default.createElement(Placeholder, null))); }))),
        react_1.default.createElement(TableBody_1.default, null, times(nbFakeLines, function (key1) { return (react_1.default.createElement(TableRow_1.default, { key: key1, style: { opacity: 1 / (key1 + 1) } },
            expand && (react_1.default.createElement(TableCell_1.default, { padding: "none", className: classes.expandIconCell },
                react_1.default.createElement(IconButton_1.default, { className: classes.expandIcon, component: "div", "aria-hidden": "true" },
                    react_1.default.createElement(ExpandMore_1.default, null)))),
            hasBulkActions && (react_1.default.createElement(TableCell_1.default, { padding: "none", className: classes.expandIconCell },
                react_1.default.createElement(Checkbox_1.default, { className: "select-all", color: "primary", checked: false }))),
            times(nbChildren, function (key2) { return (react_1.default.createElement(TableCell_1.default, { padding: "none", className: classes.rowCell, key: key2 },
                react_1.default.createElement(Placeholder, null))); }))); }))));
});
