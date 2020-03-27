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
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import WithPermissions from './auth/WithPermissions';
import { registerResource as registerResourceAction, unregisterResource as unregisterResourceAction, } from './actions';
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Resource.prototype.componentWillMount = function () {
        var _a = this.props, context = _a.context, name = _a.name, list = _a.list, create = _a.create, edit = _a.edit, show = _a.show, options = _a.options, icon = _a.icon, registerResource = _a.registerResource;
        if (context === 'registration') {
            var resource = {
                name: name,
                options: options,
                hasList: !!list,
                hasEdit: !!edit,
                hasShow: !!show,
                hasCreate: !!create,
                icon: icon,
            };
            registerResource(resource);
        }
    };
    Resource.prototype.componentWillUnmount = function () {
        var _a = this.props, context = _a.context, name = _a.name, unregisterResource = _a.unregisterResource;
        if (context === 'registration') {
            unregisterResource(name);
        }
    };
    Resource.prototype.render = function () {
        var _a = this.props, match = _a.match, context = _a.context, name = _a.name, list = _a.list, create = _a.create, edit = _a.edit, show = _a.show, options = _a.options;
        if (context === 'registration') {
            return null;
        }
        var resource = {
            resource: name,
            options: options,
            hasList: !!list,
            hasEdit: !!edit,
            hasShow: !!show,
            hasCreate: !!create,
        };
        var basePath = match.url;
        return (React.createElement(Switch, null,
            create && (React.createElement(Route, { path: match.url + "/create", render: function (routeProps) { return (React.createElement(WithPermissions, __assign({ render: function (props) {
                        return createElement(create, __assign({ basePath: basePath }, props));
                    } }, routeProps, resource))); } })),
            show && (React.createElement(Route, { path: match.url + "/:id/show", render: function (routeProps) { return (React.createElement(WithPermissions, __assign({ render: function (props) {
                        return createElement(show, __assign({ basePath: basePath, id: decodeURIComponent(props.match
                                .params.id) }, props));
                    } }, routeProps, resource))); } })),
            edit && (React.createElement(Route, { path: match.url + "/:id", render: function (routeProps) { return (React.createElement(WithPermissions, __assign({ render: function (props) {
                        return createElement(edit, __assign({ basePath: basePath, id: decodeURIComponent(props.match
                                .params.id) }, props));
                    } }, routeProps, resource))); } })),
            list && (React.createElement(Route, { path: "" + match.url, render: function (routeProps) { return (React.createElement(WithPermissions, __assign({ render: function (props) {
                        return createElement(list, __assign({ basePath: basePath }, props));
                    } }, routeProps, resource))); } }))));
    };
    Resource.defaultProps = {
        context: 'route',
        options: {},
    };
    return Resource;
}(Component));
export { Resource };
var ConnectedResource = connect(null, {
    registerResource: registerResourceAction,
    unregisterResource: unregisterResourceAction,
})(
// Necessary casting because of https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19989#issuecomment-432752918
Resource);
// Necessary casting because of https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19989#issuecomment-432752918
export default ConnectedResource;
