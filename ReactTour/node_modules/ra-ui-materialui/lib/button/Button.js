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
var compose_1 = __importDefault(require("recompose/compose"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = __importDefault(require("classnames"));
var ra_core_1 = require("ra-core");
var Responsive_1 = __importDefault(require("../layout/Responsive"));
var styles = styles_1.createStyles({
    button: {
        display: 'inline-flex',
        alignItems: 'center',
    },
    label: {
        paddingLeft: '0.5em',
    },
    labelRightIcon: {
        paddingRight: '0.5em',
    },
    smallIcon: {
        fontSize: 20,
    },
    mediumIcon: {
        fontSize: 22,
    },
    largeIcon: {
        fontSize: 24,
    },
});
var Button = function (_a) {
    var _b = _a.alignIcon, alignIcon = _b === void 0 ? 'left' : _b, children = _a.children, _c = _a.classes, classes = _c === void 0 ? {} : _c, className = _a.className, color = _a.color, disabled = _a.disabled, label = _a.label, size = _a.size, translate = _a.translate, rest = __rest(_a, ["alignIcon", "children", "classes", "className", "color", "disabled", "label", "size", "translate"]);
    var _d;
    return (react_1.default.createElement(Responsive_1.default, { small: label && !disabled ? (react_1.default.createElement(Tooltip_1.default, { title: translate(label, { _: label }) },
            react_1.default.createElement(IconButton_1.default, __assign({ "aria-label": translate(label, { _: label }), className: className, color: color }, rest), children))) : (react_1.default.createElement(IconButton_1.default, __assign({ className: className, color: color, disabled: disabled }, rest), children)), medium: react_1.default.createElement(Button_1.default, __assign({ className: classnames_1.default(classes.button, className), color: color, size: size, "aria-label": label ? translate(label, { _: label }) : undefined, disabled: disabled }, rest),
            alignIcon === 'left' &&
                children &&
                react_1.default.cloneElement(children, {
                    className: classes[size + "Icon"],
                }),
            label && (react_1.default.createElement("span", { className: classnames_1.default((_d = {},
                    _d[classes.label] = alignIcon === 'left',
                    _d[classes.labelRightIcon] = alignIcon !== 'left',
                    _d)) }, translate(label, { _: label }))),
            alignIcon === 'right' &&
                children &&
                react_1.default.cloneElement(children, {
                    className: classes[size + "Icon"],
                })) }));
};
Button.propTypes = {
    alignIcon: prop_types_1.default.string,
    children: prop_types_1.default.element,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    color: prop_types_1.default.string,
    disabled: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    size: prop_types_1.default.oneOf(['small', 'medium', 'large']),
    translate: prop_types_1.default.func.isRequired,
};
Button.defaultProps = {
    color: 'primary',
    size: 'small',
};
var enhance = compose_1.default(styles_1.withStyles(styles), ra_core_1.translate);
exports.default = enhance(Button);
