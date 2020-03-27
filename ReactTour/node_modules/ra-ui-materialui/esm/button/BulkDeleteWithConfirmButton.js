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
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ActionDelete from '@material-ui/icons/Delete';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import inflection from 'inflection';
import { translate, crudDeleteMany } from 'ra-core';
import Confirm from '../layout/Confirm';
import Button from './Button';
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, crudDeleteMany = _a.crudDeleteMany, filterValues = _a.filterValues, label = _a.label, resource = _a.resource, selectedIds = _a.selectedIds, rest = __rest(_a, ["basePath", "classes", "crudDeleteMany", "filterValues", "label", "resource", "selectedIds"]);
    return rest;
};
var styles = function (theme) {
    return createStyles({
        deleteButton: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
                // Reset on mouse devices
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    });
};
var BulkDeleteWithConfirmButton = /** @class */ (function (_super) {
    __extends(BulkDeleteWithConfirmButton, _super);
    function BulkDeleteWithConfirmButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isOpen: false };
        _this.handleClick = function (e) {
            _this.setState({ isOpen: true });
            e.stopPropagation();
        };
        _this.handleDialogClose = function () {
            _this.setState({ isOpen: false });
        };
        _this.handleDelete = function () {
            var _a = _this.props, basePath = _a.basePath, crudDeleteMany = _a.crudDeleteMany, resource = _a.resource, selectedIds = _a.selectedIds, onClick = _a.onClick;
            crudDeleteMany(resource, selectedIds, basePath);
            if (typeof onClick === 'function') {
                onClick();
            }
        };
        return _this;
    }
    BulkDeleteWithConfirmButton.prototype.render = function () {
        var _a = this.props, classes = _a.classes, label = _a.label, icon = _a.icon, onClick = _a.onClick, resource = _a.resource, selectedIds = _a.selectedIds, translate = _a.translate, rest = __rest(_a, ["classes", "label", "icon", "onClick", "resource", "selectedIds", "translate"]);
        return (React.createElement(Fragment, null,
            React.createElement(Button, __assign({ onClick: this.handleClick, label: label, className: classes.deleteButton }, sanitizeRestProps(rest)), icon),
            React.createElement(Confirm, { isOpen: this.state.isOpen, title: "ra.message.bulk_delete_title", content: "ra.message.bulk_delete_content", translateOptions: {
                    smart_count: selectedIds.length,
                    name: inflection.humanize(translate("resources." + resource + ".name", {
                        smart_count: selectedIds.length,
                        _: inflection.inflect(resource, selectedIds.length),
                    }), true),
                }, onConfirm: this.handleDelete, onClose: this.handleDialogClose })));
    };
    BulkDeleteWithConfirmButton.propTypes = {
        basePath: PropTypes.string,
        classes: PropTypes.object,
        crudDeleteMany: PropTypes.func.isRequired,
        label: PropTypes.string,
        resource: PropTypes.string.isRequired,
        selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
        icon: PropTypes.element,
    };
    BulkDeleteWithConfirmButton.defaultProps = {
        label: 'ra.action.delete',
        icon: React.createElement(ActionDelete, null),
    };
    return BulkDeleteWithConfirmButton;
}(Component));
var EnhancedBulkDeleteWithConfirmButton = compose(connect(undefined, { crudDeleteMany: crudDeleteMany }), translate, withStyles(styles))(BulkDeleteWithConfirmButton);
export default EnhancedBulkDeleteWithConfirmButton;
