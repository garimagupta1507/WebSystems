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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var query_string_1 = require("query-string");
var react_router_redux_1 = require("react-router-redux");
var compose_1 = __importDefault(require("recompose/compose"));
var reselect_1 = require("reselect");
var inflection_1 = __importDefault(require("inflection"));
var debounce_1 = __importDefault(require("lodash/debounce"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var pickBy_1 = __importDefault(require("lodash/pickBy"));
var removeEmpty_1 = __importDefault(require("../util/removeEmpty"));
var queryReducer_1 = __importStar(require("../reducer/admin/resource/list/queryReducer"));
var dataActions_1 = require("../actions/dataActions");
var listActions_1 = require("../actions/listActions");
var translate_1 = __importDefault(require("../i18n/translate"));
var removeKey_1 = __importDefault(require("../util/removeKey"));
var checkMinimumRequiredProps_1 = __importDefault(require("./checkMinimumRequiredProps"));
/**
 * List page component
 *
 * The <List> component renders the list layout (title, buttons, filters, pagination),
 * and fetches the list of records from the REST API.
 * It then delegates the rendering of the list of records to its child component.
 * Usually, it's a <Datagrid>, responsible for displaying a table with one row for each post.
 *
 * In Redux terms, <List> is a connected component, and <Datagrid> is a dumb component.
 *
 * Props:
 *   - title
 *   - perPage
 *   - sort
 *   - filter (the permanent filter to apply to the query)
 *   - actions
 *   - filters (a React Element used to display the filter form)
 *   - pagination
 *
 * @example
 *     const PostFilter = (props) => (
 *         <Filter {...props}>
 *             <TextInput label="Search" source="q" alwaysOn />
 *             <TextInput label="Title" source="title" />
 *         </Filter>
 *     );
 *     export const PostList = (props) => (
 *         <List {...props}
 *             title="List of posts"
 *             sort={{ field: 'published_at' }}
 *             filter={{ is_published: true }}
 *             filters={<PostFilter />}
 *         >
 *             <Datagrid>
 *                 <TextField source="id" />
 *                 <TextField source="title" />
 *                 <EditButton />
 *             </Datagrid>
 *         </List>
 *     );
 */
var UnconnectedListController = /** @class */ (function (_super) {
    __extends(UnconnectedListController, _super);
    function UnconnectedListController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.setFilters = debounce_1.default(function (filters) {
            if (isEqual_1.default(filters, _this.getFilterValues())) {
                return;
            }
            // fix for redux-form bug with onChange and enableReinitialize
            var filtersWithoutEmpty = removeEmpty_1.default(filters);
            _this.changeParams({ type: queryReducer_1.SET_FILTER, payload: filtersWithoutEmpty });
        }, _this.props.debounce);
        _this.setSort = function (sort) { return _this.changeParams({ type: queryReducer_1.SET_SORT, payload: { sort: sort } }); };
        _this.setPage = function (page) { return _this.changeParams({ type: queryReducer_1.SET_PAGE, payload: page }); };
        _this.setPerPage = function (perPage) {
            return _this.changeParams({ type: queryReducer_1.SET_PER_PAGE, payload: perPage });
        };
        _this.showFilter = function (filterName, defaultValue) {
            var _a, _b;
            _this.setState((_a = {}, _a[filterName] = true, _a));
            if (typeof defaultValue !== 'undefined') {
                _this.setFilters(__assign({}, _this.getFilterValues(), (_b = {}, _b[filterName] = defaultValue, _b)));
            }
        };
        _this.hideFilter = function (filterName) {
            var _a;
            _this.setState((_a = {}, _a[filterName] = false, _a));
            var newFilters = removeKey_1.default(_this.getFilterValues(), filterName);
            _this.setFilters(newFilters);
        };
        _this.handleSelect = function (ids) {
            _this.props.setSelectedIds(_this.props.resource, ids);
        };
        _this.handleUnselectItems = function () {
            _this.props.setSelectedIds(_this.props.resource, []);
        };
        _this.handleToggleItem = function (id) {
            _this.props.toggleItem(_this.props.resource, id);
        };
        return _this;
    }
    UnconnectedListController.prototype.componentDidMount = function () {
        if (this.props.filter && react_1.isValidElement(this.props.filter)) {
            throw new Error('<List> received a React element as `filter` props. If you intended to set the list filter elements, use the `filters` (with an s) prop instead. The `filter` prop is internal and should not be set by the developer.');
        }
        if (!this.props.query.page &&
            !(this.props.ids || []).length &&
            this.props.params.page > 1 &&
            this.props.total > 0) {
            this.setPage(this.props.params.page - 1);
            return;
        }
        this.updateData();
        if (Object.keys(this.props.query).length > 0) {
            this.props.changeListParams(this.props.resource, this.props.query);
        }
    };
    UnconnectedListController.prototype.componentWillUnmount = function () {
        this.setFilters.cancel();
    };
    UnconnectedListController.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.version !== this.props.version ||
            nextProps.resource !== this.props.resource ||
            !isEqual_1.default(nextProps.query, this.props.query) ||
            !isEqual_1.default(nextProps.filter, this.props.filter) ||
            !isEqual_1.default(nextProps.sort, this.props.sort) ||
            !isEqual_1.default(nextProps.perPage, this.props.perPage)) {
            this.updateData(nextProps);
        }
    };
    UnconnectedListController.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (nextProps.className === this.props.className &&
            nextProps.translate === this.props.translate &&
            nextProps.isLoading === this.props.isLoading &&
            nextProps.version === this.props.version &&
            nextState === this.state &&
            nextProps.data === this.props.data &&
            nextProps.selectedIds === this.props.selectedIds &&
            nextProps.total === this.props.total &&
            nextProps.permissions === this.props.permissions) {
            return false;
        }
        return true;
    };
    /**
     * Merge list params from 4 different sources:
     *   - the query string
     *   - the params stored in the state (from previous navigation)
     *   - the props passed to the List component
     */
    UnconnectedListController.prototype.getQuery = function (props) {
        if (props === void 0) { props = this.props; }
        var query = Object.keys(props.query).length > 0
            ? props.query
            : hasCustomParams(props.params)
                ? __assign({}, props.params) : { filter: props.filterDefaultValues || {} };
        if (!query.sort) {
            query.sort = props.sort.field;
            query.order = props.sort.order;
        }
        query.perPage = parseInt(
        // @ts-ignore
        query.perPage ? query.perPage : props.perPage, 10);
        // @ts-ignore
        query.page = query.page ? parseInt(query.page, 10) : 1;
        return query;
    };
    UnconnectedListController.prototype.getFilterValues = function () {
        var query = this.getQuery();
        return query.filter || {};
    };
    UnconnectedListController.prototype.updateData = function (props) {
        if (props === void 0) { props = this.props; }
        var query = this.getQuery(props);
        var sort = query.sort, order = query.order, _a = query.page, page = _a === void 0 ? 1 : _a, perPage = query.perPage, filter = query.filter;
        var pagination = {
            page: page,
            perPage: perPage,
        };
        this.props.crudGetList(this.props.resource, pagination, { field: sort, order: order }, __assign({}, filter, props.filter));
    };
    UnconnectedListController.prototype.changeParams = function (action) {
        var newParams = queryReducer_1.default(this.getQuery(), action);
        this.props.push(__assign({}, this.props.location, { search: "?" + query_string_1.stringify(__assign({}, newParams, { filter: JSON.stringify(newParams.filter) })) }));
        this.props.changeListParams(this.props.resource, newParams);
    };
    UnconnectedListController.prototype.render = function () {
        var _a = this.props, basePath = _a.basePath, children = _a.children, resource = _a.resource, hasCreate = _a.hasCreate, data = _a.data, ids = _a.ids, loadedOnce = _a.loadedOnce, total = _a.total, isLoading = _a.isLoading, translate = _a.translate, version = _a.version, selectedIds = _a.selectedIds;
        var query = this.getQuery();
        var resourceName = translate("resources." + resource + ".name", {
            smart_count: 2,
            _: inflection_1.default.humanize(inflection_1.default.pluralize(resource)),
        });
        var defaultTitle = translate('ra.page.list', {
            name: resourceName,
        });
        return children({
            basePath: basePath,
            currentSort: {
                field: query.sort,
                order: query.order,
            },
            data: data,
            defaultTitle: defaultTitle,
            displayedFilters: this.state,
            filterValues: this.getFilterValues(),
            hasCreate: hasCreate,
            hideFilter: this.hideFilter,
            ids: ids,
            isLoading: isLoading,
            loadedOnce: loadedOnce,
            onSelect: this.handleSelect,
            onToggleItem: this.handleToggleItem,
            onUnselectItems: this.handleUnselectItems,
            page: (typeof query.page === 'string'
                ? parseInt(query.page, 10)
                : query.page) || 1,
            perPage: (typeof query.perPage === 'string'
                ? parseInt(query.perPage, 10)
                : query.perPage) || 10,
            resource: resource,
            selectedIds: selectedIds,
            setFilters: this.setFilters,
            setPage: this.setPage,
            setPerPage: this.setPerPage,
            setSort: this.setSort,
            showFilter: this.showFilter,
            translate: translate,
            total: total,
            version: version,
        });
    };
    UnconnectedListController.defaultProps = {
        debounce: 500,
        filter: {},
        perPage: 10,
        sort: {
            field: 'id',
            order: queryReducer_1.SORT_DESC,
        },
    };
    return UnconnectedListController;
}(react_1.Component));
exports.UnconnectedListController = UnconnectedListController;
/**
 * Check if user has already set custom sort, page, or filters for this list
 *
 * User params come from the Redux store as the params props. By default,
 * this object is:
 *
 * { filter: {}, order: null, page: 1, perPage: null, sort: null }
 *
 * To check if the user has custom params, we must compare the params
 * to these initial values.
 *
 * @param {object} params
 */
var hasCustomParams = function (params) {
    return params &&
        ((params.filter && Object.keys(params.filter).length > 0) ||
            params.order != null ||
            params.page !== 1 ||
            params.perPage != null ||
            params.sort != null);
};
var injectedProps = [
    'basePath',
    'currentSort',
    'data',
    'defaultTitle',
    'displayedFilters',
    'filterValues',
    'hasCreate',
    'hideFilter',
    'ids',
    'isLoading',
    'loadedOnce',
    'onSelect',
    'onToggleItem',
    'onUnselectItems',
    'page',
    'perPage',
    'refresh',
    'resource',
    'selectedIds',
    'setFilters',
    'setPage',
    'setPerPage',
    'setSort',
    'showFilter',
    'total',
    'translate',
    'version',
];
/**
 * Select the props injected by the ListController
 * to be passed to the List children need
 * This is an implementation of pick()
 */
exports.getListControllerProps = function (props) {
    return injectedProps.reduce(function (acc, key) {
        var _a;
        return (__assign({}, acc, (_a = {}, _a[key] = props[key], _a)));
    }, {});
};
/**
 * Select the props not injected by the ListController
 * to be used inside the List children to sanitize props injected by List
 * This is an implementation of omit()
 */
exports.sanitizeListRestProps = function (props) {
    return Object.keys(props)
        .filter(function (propName) { return !injectedProps.includes(propName); })
        .reduce(function (acc, key) {
        var _a;
        return (__assign({}, acc, (_a = {}, _a[key] = props[key], _a)));
    }, {});
};
var validQueryParams = ['page', 'perPage', 'sort', 'order', 'filter'];
var getLocationPath = function (props) { return props.location.pathname; };
var getLocationSearch = function (props) { return props.location.search; };
var selectQuery = reselect_1.createSelector(getLocationPath, getLocationSearch, function (path, search) {
    var query = pickBy_1.default(query_string_1.parse(search), function (v, k) { return validQueryParams.indexOf(k) !== -1; });
    if (query.filter && typeof query.filter === 'string') {
        try {
            query.filter = JSON.parse(query.filter);
        }
        catch (err) {
            delete query.filter;
        }
    }
    return query;
});
function mapStateToProps(state, props) {
    var resourceState = state.admin.resources[props.resource];
    return {
        query: selectQuery(props),
        params: resourceState.list.params,
        ids: resourceState.list.ids,
        loadedOnce: resourceState.list.loadedOnce,
        selectedIds: resourceState.list.selectedIds,
        total: resourceState.list.total,
        data: resourceState.data,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion,
    };
}
var ListController = compose_1.default(checkMinimumRequiredProps_1.default('List', ['basePath', 'location', 'resource']), react_redux_1.connect(mapStateToProps, {
    crudGetList: dataActions_1.crudGetList,
    changeListParams: listActions_1.changeListParams,
    setSelectedIds: listActions_1.setListSelectedIds,
    toggleItem: listActions_1.toggleListItem,
    push: react_router_redux_1.push,
}), translate_1.default)(UnconnectedListController);
exports.default = ListController;
