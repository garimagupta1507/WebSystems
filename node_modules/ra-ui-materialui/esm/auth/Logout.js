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
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, createStyles, } from '@material-ui/core/styles';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import classnames from 'classnames';
import { withTranslate, userLogout as userLogoutAction, } from 'ra-core';
var styles = function (theme) {
    return createStyles({
        menuItem: {
            color: theme.palette.text.secondary,
        },
        iconMenuPaddingStyle: {
            paddingRight: '1.2em',
        },
        iconPaddingStyle: {
            paddingRight: theme.spacing.unit,
        },
    });
};
/**
 * Logout button component, to be passed to the Admin component
 *
 * Used for the Logout Menu item in the sidebar
 */
var Logout = function (_a) {
    var classes = _a.classes, className = _a.className, locale = _a.locale, redirectTo = _a.redirectTo, translate = _a.translate, userLogout = _a.userLogout, rest = __rest(_a, ["classes", "className", "locale", "redirectTo", "translate", "userLogout"]);
    return (React.createElement(MenuItem, __assign({ className: classnames('logout', classes.menuItem, className), onClick: userLogout }, rest),
        React.createElement("span", { className: classes.iconMenuPaddingStyle },
            React.createElement(ExitIcon, null)),
        translate('ra.auth.logout')));
};
var mapDispatchToProps = function (dispatch, _a) {
    var redirectTo = _a.redirectTo;
    return ({
        userLogout: function () { return dispatch(userLogoutAction(redirectTo)); },
    });
};
var enhance = compose(withTranslate, connect(undefined, mapDispatchToProps), withStyles(styles));
var EnhancedLogout = enhance(Logout);
EnhancedLogout.propTypes = {
    className: PropTypes.string,
    redirectTo: PropTypes.string,
};
export default EnhancedLogout;
