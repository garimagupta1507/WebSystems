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
import React, { Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
var getTabFullPath = function (tab, index, baseUrl) {
    return "" + baseUrl + (tab.props.path ? "/" + tab.props.path : index > 0 ? "/" + index : '');
};
var TabbedShowLayoutTabs = function (_a) {
    var children = _a.children, match = _a.match, value = _a.value, rest = __rest(_a, ["children", "match", "value"]);
    return (React.createElement(Tabs, __assign({ indicatorColor: "primary", value: value }, rest), Children.map(children, function (tab, index) {
        if (!tab || !isValidElement(tab))
            return null;
        // Builds the full tab tab which is the concatenation of the last matched route in the
        // TabbedShowLayout hierarchy (ex: '/posts/create', '/posts/12', , '/posts/12/show')
        // and the tab path.
        // This will be used as the Tab's value
        var tabPath = getTabFullPath(tab, index, match.url);
        return cloneElement(tab, {
            context: 'header',
            value: tabPath,
        });
    })));
};
TabbedShowLayoutTabs.propTypes = {
    children: PropTypes.node,
    match: PropTypes.object,
    value: PropTypes.string,
};
export default TabbedShowLayoutTabs;
