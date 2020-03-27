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
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { MuiThemeProvider, createMuiTheme, withStyles, createStyles, } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import defaultTheme from '../defaultTheme';
import Notification from '../layout/Notification';
import DefaultLoginForm from './LoginForm';
var styles = function (theme) {
    return createStyles({
        main: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            height: '1px',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        card: {
            minWidth: 300,
            marginTop: '6em',
        },
        avatar: {
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
        },
        icon: {
            backgroundColor: theme.palette.secondary[500],
        },
    });
};
/**
 * A standalone login page, to serve as authentication gate to the admin
 *
 * Expects the user to enter a login and a password, which will be checked
 * by the `authProvider` using the AUTH_LOGIN verb. Redirects to the root page
 * (/) upon success, otherwise displays an authentication error message.
 *
 * Copy and adapt this component to implement your own login logic
 * (e.g. to authenticate via email or facebook or anything else).
 *
 * @example
 *     import MyLoginPage from './MyLoginPage';
 *     const App = () => (
 *         <Admin loginPage={MyLoginPage} authProvider={authProvider}>
 *             ...
 *        </Admin>
 *     );
 */
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.theme = createMuiTheme(_this.props.theme);
        _this.containerRef = React.createRef();
        _this.backgroundImageLoaded = false;
        _this.updateBackgroundImage = function () {
            if (!_this.backgroundImageLoaded && _this.containerRef.current) {
                var backgroundImage = _this.props.backgroundImage;
                _this.containerRef.current.style.backgroundImage = "url(" + backgroundImage + ")";
                _this.backgroundImageLoaded = true;
            }
        };
        return _this;
    }
    // Load background image asynchronously to speed up time to interactive
    Login.prototype.lazyLoadBackgroundImage = function () {
        var backgroundImage = this.props.backgroundImage;
        if (backgroundImage) {
            var img = new Image();
            img.onload = this.updateBackgroundImage;
            img.src = backgroundImage;
        }
    };
    Login.prototype.componentDidMount = function () {
        this.lazyLoadBackgroundImage();
    };
    Login.prototype.componentDidUpdate = function () {
        if (!this.backgroundImageLoaded) {
            this.lazyLoadBackgroundImage();
        }
    };
    Login.prototype.render = function () {
        var _a = this.props, backgroundImage = _a.backgroundImage, classes = _a.classes, className = _a.className, loginForm = _a.loginForm, staticContext = _a.staticContext, rest = __rest(_a, ["backgroundImage", "classes", "className", "loginForm", "staticContext"]);
        return (React.createElement(MuiThemeProvider, { theme: this.theme },
            React.createElement("div", __assign({ className: classnames(classes.main, className) }, rest, { ref: this.containerRef }),
                React.createElement(Card, { className: classes.card },
                    React.createElement("div", { className: classes.avatar },
                        React.createElement(Avatar, { className: classes.icon },
                            React.createElement(LockIcon, null))),
                    loginForm),
                React.createElement(Notification, null))));
    };
    return Login;
}(Component));
var EnhancedLogin = withStyles(styles)(Login);
EnhancedLogin.propTypes = {
    backgroundImage: PropTypes.string,
    loginForm: PropTypes.element,
    theme: PropTypes.object,
    staticContext: PropTypes.object,
};
EnhancedLogin.defaultProps = {
    backgroundImage: 'https://source.unsplash.com/random/1600x900/daily',
    theme: defaultTheme,
    loginForm: React.createElement(DefaultLoginForm, null),
};
export default EnhancedLogin;
