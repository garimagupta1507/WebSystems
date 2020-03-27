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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var debounce_1 = __importDefault(require("lodash/debounce"));
var compose_1 = __importDefault(require("recompose/compose"));
var reselect_1 = require("reselect");
var get_1 = __importDefault(require("lodash/get"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var difference_1 = __importDefault(require("lodash/difference"));
var dataActions_1 = require("../../actions/dataActions");
var reducer_1 = require("../../reducer");
var referenceDataStatus_1 = require("./referenceDataStatus");
var translate_1 = __importDefault(require("../../i18n/translate"));
var defaultReferenceSource = function (resource, source) {
    return resource + "@" + source;
};
/**
 * An Input component for fields containing a list of references to another resource.
 * Useful for 'hasMany' relationship.
 *
 * @example
 * The post object has many tags, so the post resource looks like:
 * {
 *    id: 1234,
 *    tag_ids: [ "1", "23", "4" ]
 * }
 *
 * ReferenceArrayInput component fetches the current resources (using the
 * `CRUD_GET_MANY` REST method) as well as possible resources (using the
 * `CRUD_GET_MATCHING` REST method) in the reference endpoint. It then
 * delegates rendering to a subcomponent, to which it passes the possible
 * choices as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<SelectArrayInput>`
 * or <CheckboxGroupInput>.
 *
 * @example
 * export const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceArrayInput source="tag_ids" reference="tags">
 *                 <SelectArrayInput optionText="name" />
 *             </ReferenceArrayInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      perPage={100}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      sort={{ field: 'name', order: 'ASC' }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filter={{ is_public: true }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * The enclosed component may filter results. ReferenceArrayInput passes a
 * `setFilter` function as prop to its child component. It uses the value to
 * create a filter for the query - by default { q: [searchText] }. You can
 * customize the mapping searchText => searchQuery by setting a custom
 * `filterToQuery` function prop:
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filterToQuery={searchText => ({ name: searchText })}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 */
var UnconnectedReferenceArrayInputController = /** @class */ (function (_super) {
    __extends(UnconnectedReferenceArrayInputController, _super);
    function UnconnectedReferenceArrayInputController(props) {
        var _this = _super.call(this, props) || this;
        _this.setFilter = function (filter) {
            if (filter !== _this.params.filter) {
                _this.params.filter = _this.props.filterToQuery(filter);
                _this.fetchOptions();
            }
        };
        _this.setPagination = function (pagination) {
            if (pagination !== _this.params.pagination) {
                _this.params.pagination = pagination;
                _this.fetchOptions();
            }
        };
        _this.setSort = function (sort) {
            if (sort !== _this.params.sort) {
                _this.params.sort = sort;
                _this.fetchOptions();
            }
        };
        _this.fetchReferences = function (nextProps, currentProps) {
            if (currentProps === void 0) { currentProps = _this.props; }
            var crudGetMany = nextProps.crudGetMany, input = nextProps.input, reference = nextProps.reference;
            var ids = input.value;
            if (ids) {
                if (!Array.isArray(ids)) {
                    throw Error('The value of ReferenceArrayInput should be an array');
                }
                var idsToFetch = difference_1.default(ids, get_1.default(currentProps, 'input.value', []));
                if (idsToFetch.length)
                    crudGetMany(reference, idsToFetch);
            }
        };
        _this.fetchOptions = function (props) {
            if (props === void 0) { props = _this.props; }
            var crudGetMatching = props.crudGetMatching, reference = props.reference, source = props.source, resource = props.resource, referenceSource = props.referenceSource, defaultFilter = props.filter;
            var _a = _this.params, pagination = _a.pagination, sort = _a.sort, filter = _a.filter;
            crudGetMatching(reference, referenceSource(resource, source), pagination, sort, __assign({}, defaultFilter, filter));
        };
        var perPage = props.perPage, sort = props.sort, filter = props.filter;
        // stored as a property rather than state because we don't want redraw of async updates
        _this.params = { pagination: { page: 1, perPage: perPage }, sort: sort, filter: filter };
        _this.debouncedSetFilter = debounce_1.default(_this.setFilter.bind(_this), 500);
        return _this;
    }
    UnconnectedReferenceArrayInputController.prototype.componentDidMount = function () {
        this.fetchReferencesAndOptions(this.props, {});
    };
    UnconnectedReferenceArrayInputController.prototype.componentWillReceiveProps = function (nextProps) {
        var shouldFetchOptions = false;
        if ((this.props.record || { id: undefined }).id !==
            (nextProps.record || { id: undefined }).id) {
            this.fetchReferencesAndOptions(nextProps);
        }
        else if (this.props.input.value !== nextProps.input.value) {
            this.fetchReferences(nextProps);
        }
        else {
            if (!isEqual_1.default(nextProps.filter, this.props.filter)) {
                this.params = __assign({}, this.params, { filter: nextProps.filter });
                shouldFetchOptions = true;
            }
            if (!isEqual_1.default(nextProps.sort, this.props.sort)) {
                this.params = __assign({}, this.params, { sort: nextProps.sort });
                shouldFetchOptions = true;
            }
            if (nextProps.perPage !== this.props.perPage) {
                this.params = __assign({}, this.params, { pagination: __assign({}, this.params.pagination, { perPage: nextProps.perPage }) });
                shouldFetchOptions = true;
            }
        }
        if (shouldFetchOptions) {
            this.fetchOptions();
        }
    };
    UnconnectedReferenceArrayInputController.prototype.fetchReferencesAndOptions = function (nextProps, currentProps) {
        if (currentProps === void 0) { currentProps = this.props; }
        this.fetchReferences(nextProps, currentProps);
        this.fetchOptions(nextProps);
    };
    UnconnectedReferenceArrayInputController.prototype.render = function () {
        var _a = this.props, input = _a.input, referenceRecords = _a.referenceRecords, matchingReferences = _a.matchingReferences, onChange = _a.onChange, children = _a.children, translate = _a.translate;
        var dataStatus = referenceDataStatus_1.getStatusForArrayInput({
            input: input,
            matchingReferences: matchingReferences,
            referenceRecords: referenceRecords,
            translate: translate,
        });
        return children({
            choices: dataStatus.choices,
            error: dataStatus.error,
            isLoading: dataStatus.waiting,
            onChange: onChange,
            setFilter: this.debouncedSetFilter,
            setPagination: this.setPagination,
            setSort: this.setSort,
            warning: dataStatus.warning,
        });
    };
    UnconnectedReferenceArrayInputController.defaultProps = {
        allowEmpty: false,
        filter: {},
        filterToQuery: function (searchText) { return ({ q: searchText }); },
        matchingReferences: null,
        perPage: 25,
        sort: { field: 'id', order: 'DESC' },
        referenceRecords: [],
        referenceSource: defaultReferenceSource,
    };
    return UnconnectedReferenceArrayInputController;
}(react_1.Component));
exports.UnconnectedReferenceArrayInputController = UnconnectedReferenceArrayInputController;
var makeMapStateToProps = function () {
    return reselect_1.createSelector([
        reducer_1.getReferenceResource,
        reducer_1.getPossibleReferenceValues,
        function (_, _a) {
            var resource = _a.resource, input = _a.input;
            var referenceIds = input.value;
            if (!referenceIds) {
                return [];
            }
            if (Array.isArray(referenceIds)) {
                return referenceIds;
            }
            throw new Error("<ReferenceArrayInput> expects value to be an array, but the value passed as '" + resource + "." + input.name + "' is type '" + typeof referenceIds + "': " + referenceIds);
        },
    ], function (referenceState, possibleValues, inputIds) { return ({
        matchingReferences: reducer_1.getPossibleReferences(referenceState, possibleValues, inputIds),
        referenceRecords: referenceState &&
            inputIds.reduce(function (references, referenceId) {
                if (referenceState.data[referenceId]) {
                    references.push(referenceState.data[referenceId]);
                }
                return references;
            }, []),
    }); });
};
var ReferenceArrayInputController = compose_1.default(translate_1.default, react_redux_1.connect(makeMapStateToProps(), {
    crudGetMany: dataActions_1.crudGetMany,
    crudGetMatching: dataActions_1.crudGetMatching,
}))(UnconnectedReferenceArrayInputController);
ReferenceArrayInputController.defaultProps = {
    referenceSource: defaultReferenceSource,
};
exports.default = ReferenceArrayInputController;
