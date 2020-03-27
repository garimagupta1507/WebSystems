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
import { Component, isValidElement, } from 'react';
import { connect } from 'react-redux';
import { parse, stringify } from 'query-string';
import { push as pushAction } from 'react-router-redux';
import compose from 'recompose/compose';
import { createSelector } from 'reselect';
import inflection from 'inflection';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import removeEmpty from '../util/removeEmpty';
import queryReducer, { SET_SORT, SET_PAGE, SET_PER_PAGE, SET_FILTER, SORT_DESC, } from '../reducer/admin/resource/list/queryReducer';
import { crudGetList as crudGetListAction } from '../actions/dataActions';
import { changeListParams as changeListParamsAction, setListSelectedIds as setListSelectedIdsAction, toggleListItem as toggleListItemAction, } from '../actions/listActions';
import withTranslate from '../i18n/translate';
import removeKey from '../util/removeKey';
import checkMinimumRequiredProps from './checkMinimumRequiredProps';
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
        _this.setFilters = debounce(function (filters) {
            if (isEqual(filters, _this.getFilterValues())) {
                return;
            }
            // fix for redux-form bug with onChange and enableReinitialize
            var filtersWithoutEmpty = removeEmpty(filters);
            _this.changeParams({ type: SET_FILTER, payload: filtersWithoutEmpty });
        }, _this.props.debounce);
        _this.setSort = function (sort) { return _this.changeParams({ type: SET_SORT, payload: { sort: sort } }); };
        _this.setPage = function (page) { return _this.changeParams({ type: SET_PAGE, payload: page }); };
        _this.setPerPage = function (perPage) {
            return _this.changeParams({ type: SET_PER_PAGE, payload: perPage });
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
            var newFilters = removeKey(_this.getFilterValues(), filterName);
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
        if (this.props.filter && isValidElement(this.props.filter)) {
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
            !isEqual(nextProps.query, this.props.query) ||
            !isEqual(nextProps.filter, this.props.filter) ||
            !isEqual(nextProps.sort, this.props.sort) ||
            !isEqual(nextProps.perPage, this.props.perPage)) {
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
        var newParams = queryReducer(this.getQuery(), action);
        this.props.push(__assign({}, this.props.location, { search: "?" + stringify(__assign({}, newParams, { filter: JSON.stringify(newParams.filter) })) }));
        this.props.changeListParams(this.props.resource, newParams);
    };
    UnconnectedListController.prototype.render = function () {
        var _a = this.props, basePath = _a.basePath, children = _a.children, resource = _a.resource, hasCreate = _a.hasCreate, data = _a.data, ids = _a.ids, loadedOnce = _a.loadedOnce, total = _a.total, isLoading = _a.isLoading, translate = _a.translate, version = _a.version, selectedIds = _a.selectedIds;
        var query = this.getQuery();
        var resourceName = translate("resources." + resource + ".name", {
            smart_count: 2,
            _: inflection.humanize(inflection.pluralize(resource)),
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
            order: SORT_DESC,
        },
    };
    return UnconnectedListController;
}(Component));
export { UnconnectedListController };
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
export var getListControllerProps = function (props) {
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
export var sanitizeListRestProps = function (props) {
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
var selectQuery = createSelector(getLocationPath, getLocationSearch, function (path, search) {
    var query = pickBy(parse(search), function (v, k) { return validQueryParams.indexOf(k) !== -1; });
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
var ListController = compose(checkMinimumRequiredProps('List', ['basePath', 'location', 'resource']), connect(mapStateToProps, {
    crudGetList: crudGetListAction,
    changeListParams: changeListParamsAction,
    setSelectedIds: setListSelectedIdsAction,
    toggleItem: toggleListItemAction,
    push: pushAction,
}), withTranslate)(UnconnectedListController);
export default ListController;
