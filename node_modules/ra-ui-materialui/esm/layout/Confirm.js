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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionCheck from '@material-ui/icons/CheckCircle';
import AlertError from '@material-ui/icons/ErrorOutline';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { translate } from 'ra-core';
var styles = function (theme) {
    return createStyles({
        contentText: {
            minWidth: 400,
        },
        confirmPrimary: {
            color: theme.palette.primary.main,
        },
        confirmWarning: {
            color: theme.palette.error.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.error.main, 0.12),
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
        return (React.createElement(Dialog, { open: isOpen, onClose: onClose, onClick: this.handleClick, "aria-labelledby": "alert-dialog-title" },
            React.createElement(DialogTitle, { id: "alert-dialog-title" }, translate(title, __assign({ _: title }, translateOptions))),
            React.createElement(DialogContent, null,
                React.createElement(DialogContentText, { className: classes.contentText }, translate(content, __assign({ _: content }, translateOptions)))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { disabled: loading, onClick: onClose },
                    React.createElement(AlertError, { className: classes.iconPaddingStyle }),
                    translate(cancel, { _: cancel })),
                React.createElement(Button, { disabled: loading, onClick: this.handleConfirm, className: classnames('ra-confirm', (_a = {},
                        _a[classes.confirmWarning] = confirmColor === 'warning',
                        _a[classes.confirmPrimary] = confirmColor === 'primary',
                        _a)), autoFocus: true },
                    React.createElement(ActionCheck, { className: classes.iconPaddingStyle }),
                    translate(confirm, { _: confirm })))));
    };
    return Confirm;
}(Component));
Confirm.propTypes = {
    cancel: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    confirm: PropTypes.string.isRequired,
    confirmColor: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
};
Confirm.defaultProps = {
    cancel: 'ra.action.cancel',
    classes: {},
    confirm: 'ra.action.confirm',
    confirmColor: 'primary',
    isOpen: false,
};
export default compose(withStyles(styles), translate)(Confirm);
