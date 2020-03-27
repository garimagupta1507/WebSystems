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
import { withStyles, createStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import inflection from 'inflection';
import { translate, crudDelete } from 'ra-core';
import Confirm from '../layout/Confirm';
import Button from './Button';
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, classes = _a.classes, crudDelete = _a.crudDelete, filterValues = _a.filterValues, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, label = _a.label, pristine = _a.pristine, resource = _a.resource, saving = _a.saving, selectedIds = _a.selectedIds, submitOnEnter = _a.submitOnEnter, redirect = _a.redirect, rest = __rest(_a, ["basePath", "classes", "crudDelete", "filterValues", "handleSubmit", "handleSubmitWithRedirect", "invalid", "label", "pristine", "resource", "saving", "selectedIds", "submitOnEnter", "redirect"]);
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
        return (React.createElement(Fragment, null,
            React.createElement(Button, __assign({ onClick: this.handleClick, label: label, className: classnames('ra-delete-button', classes.deleteButton, className), key: "button" }, sanitizeRestProps(rest)), icon),
            React.createElement(Confirm, { isOpen: this.state.isOpen, title: "ra.message.delete_title", content: "ra.message.delete_content", translateOptions: {
                    name: inflection.humanize(translate("resources." + resource + ".name", {
                        smart_count: 1,
                        _: inflection.singularize(resource),
                    }), true),
                    id: record.id,
                }, onConfirm: this.handleDelete, onClose: this.handleDialogClose })));
    };
    return DeleteWithConfirmButton;
}(Component));
DeleteWithConfirmButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    crudDelete: PropTypes.func.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string.isRequired,
    translate: PropTypes.func,
    icon: PropTypes.element,
};
DeleteWithConfirmButton.defaultProps = {
    redirect: 'list',
    icon: React.createElement(ActionDelete, null),
};
export default compose(connect(null, { crudDelete: crudDelete }), translate, withStyles(styles))(DeleteWithConfirmButton);
