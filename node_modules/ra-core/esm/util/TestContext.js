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
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import TranslationProvider from '../i18n/TranslationProvider';
import merge from 'lodash/merge';
import { createMemoryHistory } from 'history';
import createAdminStore from '../createAdminStore';
export var defaultStore = {
    admin: {
        resources: {},
        references: { possibleValues: {} },
        ui: { viewVersion: 1 },
    },
    form: formReducer({}, { type: '@@FOO' }),
    i18n: { locale: 'en', messages: {} },
};
/**
 * Simulate a react-admin context in unit tests
 *
 * Pass custom store values as store prop
 *
 * @example
 * // in an enzyme test
 * const wrapper = render(
 *     <TestContext store={{ admin: { resources: { post: { data: { 1: {id: 1, title: 'foo' } } } } } }}>
 *         <Show {...defaultShowProps} />
 *     </TestContext>
 * );
 *
 * @example
 * // in an enzyme test, using jest.
 * const wrapper = render(
 *     <TestContext store={{ admin: { resources: { post: { data: { 1: {id: 1, title: 'foo' } } } } } }}>
 *         {({ store }) => {
 *              dispatchSpy = jest.spyOn(store, 'dispatch');
 *              return <Show {...defaultShowProps} />
 *         }}
 *     </TestContext>
 * );
 */
var TestContext = /** @class */ (function (_super) {
    __extends(TestContext, _super);
    function TestContext(props) {
        var _this = _super.call(this, props) || this;
        _this.storeWithDefault = null;
        _this.renderChildren = function () {
            var children = _this.props.children;
            return typeof children === 'function'
                ? children({ store: _this.storeWithDefault })
                : children;
        };
        var _a = props.store, store = _a === void 0 ? {} : _a, _b = props.enableReducers, enableReducers = _b === void 0 ? false : _b;
        _this.storeWithDefault = enableReducers
            ? createAdminStore({
                initialState: merge(defaultStore, store),
                dataProvider: function () { return Promise.resolve({}); },
                history: createMemoryHistory(),
            })
            : createStore(function () { return merge(defaultStore, store); });
        return _this;
    }
    TestContext.prototype.render = function () {
        return (React.createElement(Provider, { store: this.storeWithDefault },
            React.createElement(TranslationProvider, null, this.renderChildren())));
    };
    return TestContext;
}(Component));
export default TestContext;
