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
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var DialogContentText_1 = __importDefault(require("@material-ui/core/DialogContentText"));
var DialogTitle_1 = __importDefault(require("@material-ui/core/DialogTitle"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var styles_1 = require("@material-ui/core/styles");
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var CheckCircle_1 = __importDefault(require("@material-ui/icons/CheckCircle"));
var ErrorOutline_1 = __importDefault(require("@material-ui/icons/ErrorOutline"));
var classnames_1 = __importDefault(require("classnames"));
var compose_1 = __importDefault(require("recompose/compose"));
var ra_core_1 = require("ra-core");
var styles = function (theme) {
    return styles_1.createStyles({
        contentText: {
            minWidth: 400,
        },
        confirmPrimary: {
            color: theme.palette.primary.main,
        },
        confirmWarning: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: colorManipulator_1.fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
        iconPaddingStyle: {
            paddingRight: '0.5em',
        },
    });
};
/**
 * Confirmation dialog
 *
 * @example
 * <Confirm
 *     isOpen={true}
 *     title="Delete Item"
 *     content="Are you sure you want to delete this item?"
 *     confirm="Yes"
 *     confirmColor="primary"
 *     cancel="Cancel"
 *     onConfirm={() => { // do something }}
 *     onClose={() => { // do something }}
 * />
 */
var Confirm = /** @class */ (function (_super) {
    __extends(Confirm, _super);
    function Confirm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { loading: false };
        _this.handleConfirm = function (e) {
            e.stopPropagation();
            _this.setState({ loading: true });
            _this.props.onConfirm();
        };
        _this.handleClick = function (e) {
            e.stopPropagation();
        };
        return _this;
    }
    Confirm.prototype.render = function () {
        var _a;
        var _b = this.props, isOpen = _b.isOpen, title = _b.title, content = _b.content, confirm = _b.confirm, cancel = _b.cancel, confirmColor = _b.confirmColor, onClose = _b.onClose, classes = _b.classes, translate = _b.translate, _c = _b.translateOptions, translateOptions = _c === void 0 ? {} : _c;
        var loading = this.state.loading;
        return (react_1.default.createElement(Dialog_1.default, { open: isOpen, onClose: onClose, onClick: this.handleClick, "aria-labelledby": "alert-dialog-title" },
            react_1.default.createElement(DialogTitle_1.default, { id: "alert-dialog-title" }, translate(title, __assign({ _: title }, translateOptions))),
            react_1.default.createElement(DialogContent_1.default, null,
                react_1.default.createElement(DialogContentText_1.default, { className: classes.contentText }, translate(content, __assign({ _: content }, translateOptions)))),
            react_1.default.createElement(DialogActions_1.default, null,
                react_1.default.createElement(Button_1.default, { disabled: loading, onClick: onClose },
                    react_1.default.createElement(ErrorOutline_1.default, { className: classes.iconPaddingStyle }),
                    translate(cancel, { _: cancel })),
                react_1.default.createElement(Button_1.default, { disabled: loading, onClick: this.handleConfirm, className: classnames_1.default('ra-confirm', (_a = {},
                        _a[classes.confirmWarning] = confirmColor === 'warning',
                        _a[classes.confirmPrimary] = confirmColor === 'primary',
                        _a)), autoFocus: true },
                    react_1.default.createElement(CheckCircle_1.default, { className: classes.iconPaddingStyle }),
                    translate(confirm, { _: confirm })))));
    };
    return Confirm;
}(react_1.Component));
Confirm.propTypes = {
    cancel: prop_types_1.default.string.isRequired,
    classes: prop_types_1.default.object.isRequired,
    confirm: prop_types_1.default.string.isRequired,
    confirmColor: prop_types_1.default.string.isRequired,
    content: prop_types_1.default.string.isRequired,
    isOpen: prop_types_1.default.bool,
    onClose: prop_types_1.default.func.isRequired,
    onConfirm: prop_types_1.default.func.isRequired,
    title: prop_types_1.default.string.isRequired,
    translate: prop_types_1.default.func.isRequired,
};
Confirm.defaultProps = {
    cancel: 'ra.action.cancel',
    classes: {},
    confirm: 'ra.action.confirm',
    confirmColor: 'primary',
    isOpen: false,
};
exports.default = compose_1.default(styles_1.withStyles(styles), ra_core_1.translate)(Confirm);
