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
var inflection_1 = __importDefault(require("inflection"));
var ra_core_1 = require("ra-core");
var Confirm_1 = __importDefault(require("../layout/Confirm"));
var Button_1 = __importDefault(require("./Button"));
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, crudDelete = _a.crudDelete, filterValues = _a.filterValues, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, label = _a.label, pristine = _a.pristine, resource = _a.resource, saving = _a.saving, selectedIds = _a.selectedIds, submitOnEnter = _a.submitOnEnter, redirect = _a.redirect, rest = __rest(_a, ["basePath", "classes", "crudDelete", "filterValues", "handleSubmit", "handleSubmitWithRedirect", "invalid", "label", "pristine", "resource", "saving", "selectedIds", "submitOnEnter", "redirect"]);
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
var DeleteWithConfirmButton = /** @class */ (function (_super) {
    __extends(DeleteWithConfirmButton, _super);
    function DeleteWithConfirmButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isOpen: false };
        _this.handleClick = function (e) {
            e.stopPropagation();
            _this.setState({ isOpen: true });
        };
        _this.handleDialogClose = function (e) {
            e.stopPropagation();
            _this.setState({ isOpen: false });
        };
        _this.handleDelete = function () {
            var _a = _this.props, crudDelete = _a.crudDelete, resource = _a.resource, record = _a.record, basePath = _a.basePath, redirect = _a.redirect;
            crudDelete(resource, record.id, record, basePath, redirect);
        };
        return _this;
    }
    DeleteWithConfirmButton.prototype.render = function () {
        var _a = this.props, _b = _a.classes, classes = _b === void 0 ? {} : _b, className = _a.className, icon = _a.icon, _c = _a.label, label = _c === void 0 ? 'ra.action.delete' : _c, onClick = _a.onClick, record = _a.record, resource = _a.resource, translate = _a.translate, rest = __rest(_a, ["classes", "className", "icon", "label", "onClick", "record", "resource", "translate"]);
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(Button_1.default, __assign({ onClick: this.handleClick, label: label, className: classnames_1.default('ra-delete-button', classes.deleteButton, className), key: "button" }, sanitizeRestProps(rest)), icon),
            react_1.default.createElement(Confirm_1.default, { isOpen: this.state.isOpen, title: "ra.message.delete_title", content: "ra.message.delete_content", translateOptions: {
                    name: inflection_1.default.humanize(translate("resources." + resource + ".name", {
                        smart_count: 1,
                        _: inflection_1.default.singularize(resource),
                    }), true),
                    id: record.id,
                }, onConfirm: this.handleDelete, onClose: this.handleDialogClose })));
    };
    return DeleteWithConfirmButton;
}(react_1.Component));
DeleteWithConfirmButton.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    crudDelete: prop_types_1.default.func.isRequired,
    label: prop_types_1.default.string,
    record: prop_types_1.default.object,
    redirect: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.bool,
        prop_types_1.default.func,
    ]),
    resource: prop_types_1.default.string.isRequired,
    translate: prop_types_1.default.func,
    icon: prop_types_1.default.element,
};
DeleteWithConfirmButton.defaultProps = {
    redirect: 'list',
    icon: react_1.default.createElement(Delete_1.default, null),
};
exports.default = compose_1.default(react_redux_1.connect(null, { crudDelete: ra_core_1.crudDelete }), ra_core_1.translate, styles_1.withStyles(styles))(DeleteWithConfirmButton);
