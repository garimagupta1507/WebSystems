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
var styles_1 = require("@material-ui/core/styles");
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var Button_1 = __importDefault(require("./Button"));
exports.sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, dispatchCrudDelete = _a.dispatchCrudDelete, filterValues = _a.filterValues, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, label = _a.label, pristine = _a.pristine, resource = _a.resource, saving = _a.saving, selectedIds = _a.selectedIds, startUndoable = _a.startUndoable, undoable = _a.undoable, redirect = _a.redirect, submitOnEnter = _a.submitOnEnter, rest = __rest(_a, ["basePath", "classes", "dispatchCrudDelete", "filterValues", "handleSubmit", "handleSubmitWithRedirect", "invalid", "label", "pristine", "resource", "saving", "selectedIds", "startUndoable", "undoable", "redirect", "submitOnEnter"]);
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
var DeleteWithUndoButton = /** @class */ (function (_super) {
    __extends(DeleteWithUndoButton, _super);
    function DeleteWithUndoButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleDelete = function (event) {
            event.stopPropagation();
            var _a = _this.props, startUndoable = _a.startUndoable, resource = _a.resource, record = _a.record, basePath = _a.basePath, redirect = _a.redirect, onClick = _a.onClick;
            startUndoable(ra_core_1.crudDelete(resource, record.id, record, basePath, redirect));
            if (typeof onClick === 'function') {
                onClick();
            }
        };
        return _this;
    }
    DeleteWithUndoButton.prototype.render = function () {
        var _a = this.props, _b = _a.label, label = _b === void 0 ? 'ra.action.delete' : _b, _c = _a.classes, classes = _c === void 0 ? {} : _c, className = _a.className, icon = _a.icon, onClick = _a.onClick, rest = __rest(_a, ["label", "classes", "className", "icon", "onClick"]);
        return (react_1.default.createElement(Button_1.default, __assign({ onClick: this.handleDelete, label: label, className: classnames_1.default('ra-delete-button', classes.deleteButton, className), key: "button" }, exports.sanitizeRestProps(rest)), icon));
    };
    return DeleteWithUndoButton;
}(react_1.Component));
DeleteWithUndoButton.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    label: prop_types_1.default.string,
    record: prop_types_1.default.object,
    redirect: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.bool,
        prop_types_1.default.func,
    ]),
    resource: prop_types_1.default.string.isRequired,
    startUndoable: prop_types_1.default.func,
    translate: prop_types_1.default.func,
    icon: prop_types_1.default.element,
};
DeleteWithUndoButton.defaultProps = {
    redirect: 'list',
    undoable: true,
    icon: react_1.default.createElement(Delete_1.default, null),
};
exports.default = compose_1.default(react_redux_1.connect(null, { startUndoable: ra_core_1.startUndoable }), ra_core_1.translate, styles_1.withStyles(styles))(DeleteWithUndoButton);
