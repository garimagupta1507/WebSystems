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
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import { withTranslate } from 'ra-core';
var ExpandRowButton = function (_a) {
    var classes = _a.classes, expanded = _a.expanded, expandContentId = _a.expandContentId, translate = _a.translate, props = __rest(_a, ["classes", "expanded", "expandContentId", "translate"]);
    var _b;
    return (React.createElement(IconButton, __assign({ "aria-label": translate(expanded ? 'ra.action.close' : 'ra.action.expand'), "aria-expanded": expanded, "aria-controls": expandContentId, className: classNames(classes.expandIcon, (_b = {},
            _b[classes.expanded] = expanded,
            _b)), component: "div", tabIndex: -1, "aria-hidden": "true" }, props),
        React.createElement(ExpandMoreIcon, null)));
};
export default withTranslate(ExpandRowButton);
