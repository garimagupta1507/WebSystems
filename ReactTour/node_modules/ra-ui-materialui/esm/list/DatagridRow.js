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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import React, { Component, Fragment, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { linkToRecord } from 'ra-core';
import DatagridCell from './DatagridCell';
import ExpandRowButton from './ExpandRowButton';
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, rowClick = _a.rowClick, id = _a.id, isLoading = _a.isLoading, onToggleItem = _a.onToggleItem, push = _a.push, record = _a.record, resource = _a.resource, selected = _a.selected, style = _a.style, styles = _a.styles, rest = __rest(_a, ["basePath", "children", "classes", "className", "rowClick", "id", "isLoading", "onToggleItem", "push", "record", "resource", "selected", "style", "styles"]);
    return rest;
};
var DatagridRow = /** @class */ (function (_super) {
    __extends(DatagridRow, _super);
    function DatagridRow(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidUpdate = function (prevProps, prevState) {
            var colSpan = _this.computeColSpan(_this.props);
            if (colSpan !== prevState.colSpan) {
                _this.setState({ colSpan: colSpan });
            }
        };
        _this.handleToggleExpanded = function (event) {
            _this.setState(function (state) { return ({ expanded: !state.expanded }); });
            event.stopPropagation();
        };
        _this.handleToggle = function (event) {
            _this.props.onToggleItem(_this.props.id);
            event.stopPropagation();
        };
        _this.handleClick = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var _a, basePath, rowClick, id, record, path;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, basePath = _a.basePath, rowClick = _a.rowClick, id = _a.id, record = _a.record;
                        if (!rowClick)
                            return [2 /*return*/];
                        if (!(typeof rowClick === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, rowClick(id, basePath, record)];
                    case 1:
                        path = _b.sent();
                        this.handleRedirection(path, event);
                        return [2 /*return*/];
                    case 2:
                        this.handleRedirection(rowClick, event);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.handleRedirection = function (path, event) {
            var _a = _this.props, basePath = _a.basePath, id = _a.id, push = _a.push;
            if (path === 'edit') {
                push(linkToRecord(basePath, id));
                return;
            }
            if (path === 'show') {
                push(linkToRecord(basePath, id, 'show'));
                return;
            }
            if (path === 'expand') {
                _this.handleToggleExpanded(event);
                return;
            }
            if (!path)
                return;
            push(path);
        };
        _this.computeColSpan = function (props) {
            var children = props.children, hasBulkActions = props.hasBulkActions;
            return (1 + // show expand button
                (hasBulkActions ? 1 : 0) + // checkbox column
                React.Children.toArray(children).filter(function (child) { return !!child; }).length // non-null children
            );
        };
        _this.state = {
            expanded: false,
            colSpan: _this.computeColSpan(props),
        };
        return _this;
    }
    DatagridRow.prototype.render = function () {
        var _a = this.props, basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, expand = _a.expand, hasBulkActions = _a.hasBulkActions, hover = _a.hover, id = _a.id, record = _a.record, resource = _a.resource, selected = _a.selected, style = _a.style, styles = _a.styles, rest = __rest(_a, ["basePath", "children", "classes", "className", "expand", "hasBulkActions", "hover", "id", "record", "resource", "selected", "style", "styles"]);
        var _b = this.state, expanded = _b.expanded, colSpan = _b.colSpan;
        return (React.createElement(Fragment, null,
            React.createElement(TableRow, __assign({ className: className, key: id, style: style, hover: hover, onClick: this.handleClick }, sanitizeRestProps(rest)),
                expand && (React.createElement(TableCell, { padding: "none", className: classes.expandIconCell },
                    React.createElement(ExpandRowButton, { classes: classes, expanded: expanded, expandContentId: id + "-expand", onClick: this.handleToggleExpanded }))),
                hasBulkActions && (React.createElement(TableCell, { padding: "none" },
                    React.createElement(Checkbox, { color: "primary", className: "select-item " + classes.checkbox, checked: selected, onClick: this.handleToggle }))),
                React.Children.map(children, function (field, index) {
                    return isValidElement(field) ? (React.createElement(DatagridCell, __assign({ key: id + "-" + (field.props.source || index), className: classNames("column-" + field.props.source, classes.rowCell), record: record }, { field: field, basePath: basePath, resource: resource }))) : null;
                })),
            expand && expanded && (React.createElement(TableRow, { key: id + "-expand", id: id + "-expand" },
                React.createElement(TableCell, { colSpan: colSpan }, React.cloneElement(expand, {
                    record: record,
                    basePath: basePath,
                    resource: resource,
                    id: String(id),
                }))))));
    };
    return DatagridRow;
}(Component));
DatagridRow.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    expand: PropTypes.node,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    id: PropTypes.any,
    onToggleItem: PropTypes.func,
    push: PropTypes.func,
    record: PropTypes.object.isRequired,
    resource: PropTypes.string,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    selected: PropTypes.bool,
    style: PropTypes.object,
    styles: PropTypes.object,
};
DatagridRow.defaultProps = {
    hasBulkActions: false,
    hover: true,
    record: {},
    selected: false,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
DatagridRow.displayName = 'DatagridRow';
export default connect(null, { push: push })(DatagridRow);
