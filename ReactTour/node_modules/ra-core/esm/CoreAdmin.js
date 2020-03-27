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
import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import withContext from 'recompose/withContext';
import createAdminStore from './createAdminStore';
import TranslationProvider from './i18n/TranslationProvider';
import CoreAdminRouter from './CoreAdminRouter';
var DefaultLayout = function (_a) {
    var children = _a.children;
    return React.createElement(React.Fragment, null, children);
};
var CoreAdminBase = /** @class */ (function (_super) {
    __extends(CoreAdminBase, _super);
    function CoreAdminBase(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.reduxIsAlreadyInitialized = false;
        _this.history = null;
        if (context.store) {
            _this.reduxIsAlreadyInitialized = true;
            if (!props.history) {
                throw new Error("Missing history prop.\nWhen integrating react-admin inside an existing redux Provider, you must provide the same 'history' prop to the <Admin> as the one used to bootstrap your routerMiddleware.\nReact-admin uses this history for its own ConnectedRouter.");
            }
            _this.history = props.history;
        }
        else {
            if (!props.dataProvider) {
                throw new Error("Missing dataProvider prop.\nReact-admin requires a valid dataProvider function to work.");
            }
            _this.history = props.history || createHashHistory();
        }
        return _this;
    }
    CoreAdminBase.prototype.renderCore = function () {
        var _a = this.props, appLayout = _a.appLayout, authProvider = _a.authProvider, children = _a.children, _b = _a.customRoutes, customRoutes = _b === void 0 ? [] : _b, dashboard = _a.dashboard, menu = _a.menu, // deprecated, use a custom layout instead
        catchAll = _a.catchAll, theme = _a.theme, _c = _a.title, title = _c === void 0 ? 'React Admin' : _c, loading = _a.loading, loginPage = _a.loginPage, logoutButton = _a.logoutButton;
        var logout = authProvider ? createElement(logoutButton) : null;
        if (loginPage === true && process.env.NODE_ENV !== 'production') {
            console.warn('You passed true to the loginPage prop. You must either pass false to disable it or a component class to customize it');
        }
        return (React.createElement(TranslationProvider, null,
            React.createElement(ConnectedRouter, { history: this.history },
                React.createElement(Switch, null,
                    loginPage !== false && loginPage !== true ? (React.createElement(Route, { exact: true, path: "/login", render: function (props) {
                            return createElement(loginPage, __assign({}, props, { title: title,
                                theme: theme }));
                        } })) : null,
                    React.createElement(Route, { path: "/", render: function (props) { return (React.createElement(CoreAdminRouter, __assign({ appLayout: appLayout, catchAll: catchAll, customRoutes: customRoutes, dashboard: dashboard, loading: loading, logout: logout, menu: menu, theme: theme, title: title }, props), children)); } })))));
    };
    CoreAdminBase.prototype.render = function () {
        var _a = this.props, authProvider = _a.authProvider, customReducers = _a.customReducers, customSagas = _a.customSagas, dataProvider = _a.dataProvider, i18nProvider = _a.i18nProvider, initialState = _a.initialState, locale = _a.locale;
        return this.reduxIsAlreadyInitialized ? (this.renderCore()) : (React.createElement(Provider, { store: createAdminStore({
                authProvider: authProvider,
                customReducers: customReducers,
                customSagas: customSagas,
                dataProvider: dataProvider,
                i18nProvider: i18nProvider,
                initialState: initialState,
                locale: locale,
                history: this.history,
            }) }, this.renderCore()));
    };
    CoreAdminBase.contextTypes = {
        store: PropTypes.object,
    };
    CoreAdminBase.defaultProps = {
        catchAll: function () { return null; },
        appLayout: DefaultLayout,
        loading: function () { return null; },
        loginPage: false,
    };
    return CoreAdminBase;
}(Component));
var CoreAdmin = withContext({
    authProvider: PropTypes.func,
}, function (_a) {
    var authProvider = _a.authProvider;
    return ({ authProvider: authProvider });
})(CoreAdminBase);
export default CoreAdmin;
