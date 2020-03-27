import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import { withStyles, createStyles } from '@material-ui/core/styles';
var RawPlaceholder = function (_a) {
    var classes = _a.classes;
    return (React.createElement("div", { className: classes.root }, "\u00A0"));
};
var styles = function (theme) {
    return createStyles({
        root: {
            backgroundColor: theme.palette.grey[300],
            display: 'flex',
        },
    });
};
var Placeholder = withStyles(styles)(RawPlaceholder);
var times = function (nbChildren, fn) {
    return Array.from({ length: nbChildren }, function (_, key) { return fn(key); });
};
export default (function (_a) {
    var classes = _a.classes, className = _a.className, expand = _a.expand, hasBulkActions = _a.hasBulkActions, nbChildren = _a.nbChildren, _b = _a.nbFakeLines, nbFakeLines = _b === void 0 ? 5 : _b;
    return (React.createElement(Table, { className: classnames(classes.table, className) },
        React.createElement(TableHead, null,
            React.createElement(TableRow, { className: classes.row },
                expand && React.createElement(TableCell, { className: classes.expandHeader }),
                hasBulkActions && (React.createElement(TableCell, { padding: "none", className: classes.expandIconCell },
                    React.createElement(Checkbox, { className: "select-all", color: "primary", checked: false }))),
                times(nbChildren, function (key) { return (React.createElement(TableCell, { padding: "none", variant: "head", className: classes.headerCell, key: key },
                    React.createElement(Placeholder, null))); }))),
        React.createElement(TableBody, null, times(nbFakeLines, function (key1) { return (React.createElement(TableRow, { key: key1, style: { opacity: 1 / (key1 + 1) } },
            expand && (React.createElement(TableCell, { padding: "none", className: classes.expandIconCell },
                React.createElement(IconButton, { className: classes.expandIcon, component: "div", "aria-hidden": "true" },
                    React.createElement(ExpandMoreIcon, null)))),
            hasBulkActions && (React.createElement(TableCell, { padding: "none", className: classes.expandIconCell },
                React.createElement(Checkbox, { className: "select-all", color: "primary", checked: false }))),
            times(nbChildren, function (key2) { return (React.createElement(TableCell, { padding: "none", className: classes.rowCell, key: key2 },
                React.createElement(Placeholder, null))); }))); }))));
});
