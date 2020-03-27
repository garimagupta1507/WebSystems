"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_redux_1 = require("react-redux");
var compose_1 = __importDefault(require("recompose/compose"));
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var styles_1 = require("@material-ui/core/styles");
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var ra_core_1 = require("ra-core");
var Button_1 = __importDefault(require("./Button"));
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, dispatchCrudDeleteMany = _a.dispatchCrudDeleteMany, filterValues = _a.filterValues, label = _a.label, resource = _a.resource, selectedIds = _a.selectedIds, startUndoable = _a.startUndoable, undoable = _a.undoable, rest = __rest(_a, ["basePath", "classes", "dispatchCrudDeleteMany", "filterValues", "label", "resource", "selectedIds", "startUndoable", "undoable"]);
    return rest;
};
var styles = function (theme) {
    return styles_1.createStyles({
        deleteButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: colorManipulator_1.fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    });
};
var BulkDeleteWithUndoButton = /** @class */ (function (_super) {
    __extends(BulkDeleteWithUndoButton, _super);
    function BulkDeleteWithUndoButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            var _a = _this.props, basePath = _a.basePath, resource = _a.resource, selectedIds = _a.selectedIds, startUndoable = _a.startUndoable, onClick = _a.onClick;
            startUndoable(ra_core_1.crudDeleteMany(resource, selectedIds, basePath));
            if (typeof onClick === 'function') {
                onClick();
            }
        };
        return _this;
    }
    BulkDeleteWithUndoButton.prototype.render = function () {
        var _a = this.props, classes = _a.classes, label = _a.label, icon = _a.icon, onClick = _a.onClick, rest = __rest(_a, ["classes", "label", "icon", "onClick"]);
        return (react_1.default.createElement(Button_1.default, __assign({ onClick: this.handleClick, label: label, className: classes.deleteButton }, sanitizeRestProps(rest)), icon));
    };
    BulkDeleteWithUndoButton.propTypes = {
        basePath: prop_types_1.default.string,
        classes: prop_types_1.default.object,
        label: prop_types_1.default.string,
        resource: prop_types_1.default.string.isRequired,
        startUndoable: prop_types_1.default.func,
        selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any).isRequired,
        icon: prop_types_1.default.element,
    };
    BulkDeleteWithUndoButton.defaultProps = {
        label: 'ra.action.delete',
        undoable: true,
        icon: react_1.default.createElement(Delete_1.default, null),
    };
    return BulkDeleteWithUndoButton;
}(react_1.Component));
var EnhancedBulkDeleteWithUndoButton = compose_1.default(react_redux_1.connect(undefined, {
    startUndoable: ra_core_1.startUndoable,
}), styles_1.withStyles(styles))(BulkDeleteWithUndoButton);
exports.default = EnhancedBulkDeleteWithUndoButton;
