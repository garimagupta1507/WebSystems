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
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var redux_form_1 = require("redux-form");
var TranslationProvider_1 = __importDefault(require("../i18n/TranslationProvider"));
var merge_1 = __importDefault(require("lodash/merge"));
var history_1 = require("history");
var createAdminStore_1 = __importDefault(require("../createAdminStore"));
exports.defaultStore = {
    admin: {
        resources: {},
        references: { possibleValues: {} },
        ui: { viewVersion: 1 },
    },
    form: redux_form_1.reducer({}, { type: '@@FOO' }),
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
            ? createAdminStore_1.default({
                initialState: merge_1.default(exports.defaultStore, store),
                dataProvider: function () { return Promise.resolve({}); },
                history: history_1.createMemoryHistory(),
            })
            : redux_1.createStore(function () { return merge_1.default(exports.defaultStore, store); });
        return _this;
    }
    TestContext.prototype.render = function () {
        return (react_1.default.createElement(react_redux_1.Provider, { store: this.storeWithDefault },
            react_1.default.createElement(TranslationProvider_1.default, null, this.renderChildren())));
    };
    return TestContext;
}(react_1.Component));
exports.default = TestContext;
