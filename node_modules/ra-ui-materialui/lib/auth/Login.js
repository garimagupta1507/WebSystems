"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
var styles_1 = require("@material-ui/core/styles");
var Lock_1 = __importDefault(require("@material-ui/icons/Lock"));
var defaultTheme_1 = __importDefault(require("../defaultTheme"));
var Notification_1 = __importDefault(require("../layout/Notification"));
var LoginForm_1 = __importDefault(require("./LoginForm"));
var styles = function (theme) {
    return styles_1.createStyles({
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
        _this.theme = styles_1.createMuiTheme(_this.props.theme);
        _this.containerRef = react_1.default.createRef();
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
        return (react_1.default.createElement(styles_1.MuiThemeProvider, { theme: this.theme },
            react_1.default.createElement("div", __assign({ className: classnames_1.default(classes.main, className) }, rest, { ref: this.containerRef }),
                react_1.default.createElement(Card_1.default, { className: classes.card },
                    react_1.default.createElement("div", { className: classes.avatar },
                        react_1.default.createElement(Avatar_1.default, { className: classes.icon },
                            react_1.default.createElement(Lock_1.default, null))),
                    loginForm),
                react_1.default.createElement(Notification_1.default, null))));
    };
    return Login;
}(react_1.Component));
var EnhancedLogin = styles_1.withStyles(styles)(Login);
EnhancedLogin.propTypes = {
    backgroundImage: prop_types_1.default.string,
    loginForm: prop_types_1.default.element,
    theme: prop_types_1.default.object,
    staticContext: prop_types_1.default.object,
};
EnhancedLogin.defaultProps = {
    backgroundImage: 'https://source.unsplash.com/random/1600x900/daily',
    theme: defaultTheme_1.default,
    loginForm: react_1.default.createElement(LoginForm_1.default, null),
};
exports.default = EnhancedLogin;
