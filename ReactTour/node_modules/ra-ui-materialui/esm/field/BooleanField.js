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
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import FalseIcon from '@material-ui/icons/Clear';
import TrueIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { translate as withTranslate } from 'ra-core';
import { fieldPropTypes } from './types';
import sanitizeRestProps from './sanitizeRestProps';
var styles = createStyles({
    label: {
        // Move the text out of the flow of the container.
        position: 'absolute',
        // Reduce its height and width to just one pixel.
        height: 1,
        width: 1,
        // Hide any overflowing elements or text.
        overflow: 'hidden',
        // Clip the box to zero pixels.
        clip: 'rect(0, 0, 0, 0)',
        // Text won't wrap to a second line.
        whiteSpace: 'nowrap',
    },
});
export var BooleanField = function (_a) {
    var className = _a.className, classes = _a.classes, source = _a.source, _b = _a.record, record = _b === void 0 ? {} : _b, translate = _a.translate, valueLabelTrue = _a.valueLabelTrue, valueLabelFalse = _a.valueLabelFalse, rest = __rest(_a, ["className", "classes", "source", "record", "translate", "valueLabelTrue", "valueLabelFalse"]);
    var value = get(record, source);
    var ariaLabel = value ? valueLabelTrue : valueLabelFalse;
    if (!ariaLabel) {
        ariaLabel = value === false ? 'ra.boolean.false' : 'ra.boolean.true';
    }
    if (value === false) {
        return (React.createElement(Typography, __assign({ component: "span", variant: "body1", className: className }, sanitizeRestProps(rest)),
            React.createElement("span", { className: classes.label }, translate(ariaLabel, { _: ariaLabel })),
            React.createElement(FalseIcon, { "data-testid": "false" })));
    }
    if (value === true) {
        return (React.createElement(Typography, __assign({ component: "span", variant: "body1", className: className }, sanitizeRestProps(rest)),
            React.createElement("span", { className: classes.label }, translate(ariaLabel, { _: ariaLabel })),
            React.createElement(TrueIcon, { "data-testid": "true" })));
    }
    return (React.createElement(Typography, __assign({ component: "span", variant: "body1", className: className }, sanitizeRestProps(rest))));
};
var EnhancedBooleanField = compose(pure, withStyles(styles), withTranslate)(BooleanField);
EnhancedBooleanField.defaultProps = {
    addLabel: true,
};
EnhancedBooleanField.propTypes = __assign({}, Typography.propTypes, fieldPropTypes, { valueLabelFalse: PropTypes.string, valueLabelTrue: PropTypes.string });
EnhancedBooleanField.displayName = 'EnhancedBooleanField';
export default EnhancedBooleanField;
