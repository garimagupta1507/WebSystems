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
import { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import compose from 'recompose/compose';
import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import { crudGetManyAccumulate as crudGetManyAccumulateAction, crudGetMatchingAccumulate as crudGetMatchingAccumulateAction, } from '../../actions/accumulateActions';
import { getPossibleReferences, getPossibleReferenceValues, getReferenceResource, } from '../../reducer';
import { getStatusForInput as getDataStatus } from './referenceDataStatus';
import withTranslate from '../../i18n/translate';
var defaultReferenceSource = function (resource, source) {
    return resource + "@" + source;
};
/**
 * An Input component for choosing a reference record. Useful for foreign keys.
 *
 * This component fetches the possible values in the reference resource
 * (using the `CRUD_GET_MATCHING` REST method), then delegates rendering
 * to a subcomponent, to which it passes the possible choices
 * as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<AutocompleteInput>`,
 * `<SelectInput>`, or `<RadioButtonGroupInput>`.
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <AutocompleteInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <SelectInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      perPage={100}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      sort={{ field: 'title', order: 'ASC' }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filter={{ is_published: true }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * The enclosed component may filter results. ReferenceInput passes a `setFilter`
 * function as prop to its child component. It uses the value to create a filter
 * for the query - by default { q: [searchText] }. You can customize the mapping
 * searchText => searchQuery by setting a custom `filterToQuery` function prop:
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filterToQuery={searchText => ({ title: searchText })}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 */
var UnconnectedReferenceInputController = /** @class */ (function (_super) {
    __extends(UnconnectedReferenceInputController, _super);
    function UnconnectedReferenceInputController(props) {
        var _this = _super.call(this, props) || this;
        _this.setFilter = function (filter) {
            if (filter !== _this.state.filter) {
                _this.setState({ filter: _this.props.filterToQuery(filter) }, _this.fetchOptions);
            }
        };
        _this.setPagination = function (pagination) {
            if (pagination !== _this.state.pagination) {
                _this.setState({ pagination: pagination }, _this.fetchOptions);
            }
        };
        _this.setSort = function (sort) {
            if (sort !== _this.state.sort) {
                _this.setState({ sort: sort }, _this.fetchOptions);
            }
        };
        _this.fetchReference = function (props) {
            if (props === void 0) { props = _this.props; }
            var crudGetManyAccumulate = props.crudGetManyAccumulate, input = props.input, reference = props.reference;
            var id = input.value;
            if (id) {
                crudGetManyAccumulate(reference, [id]);
            }
        };
        _this.fetchOptions = function (props) {
            if (props === void 0) { props = _this.props; }
            var crudGetMatchingAccumulate = props.crudGetMatchingAccumulate, filterFromProps = props.filter, reference = props.reference, referenceSource = props.referenceSource, resource = props.resource, source = props.source;
            var _a = _this.state, pagination = _a.pagination, sort = _a.sort, filter = _a.filter;
            crudGetMatchingAccumulate(reference, referenceSource(resource, source), pagination, sort, __assign({}, filterFromProps, filter));
        };
        var perPage = props.perPage, sort = props.sort, filter = props.filter;
        _this.state = { pagination: { page: 1, perPage: perPage }, sort: sort, filter: filter };
        _this.debouncedSetFilter = debounce(_this.setFilter.bind(_this), 500);
        return _this;
    }
    UnconnectedReferenceInputController.prototype.componentDidMount = function () {
        this.fetchReferenceAndOptions(this.props);
    };
    UnconnectedReferenceInputController.prototype.componentWillReceiveProps = function (nextProps) {
        if ((this.props.record || { id: undefined }).id !==
            (nextProps.record || { id: undefined }).id) {
            this.fetchReferenceAndOptions(nextProps);
        }
        else if (this.props.input.value !== nextProps.input.value) {
            this.fetchReference(nextProps);
        }
        else if (!isEqual(nextProps.filter, this.props.filter) ||
            !isEqual(nextProps.sort, this.props.sort) ||
            nextProps.perPage !== this.props.perPage) {
            this.setState(function (state) { return ({
                filter: nextProps.filter,
                pagination: __assign({}, state.pagination, { perPage: nextProps.perPage }),
                sort: nextProps.sort,
            }); }, this.fetchOptions);
        }
    };
    UnconnectedReferenceInputController.prototype.fetchReferenceAndOptions = function (props) {
        this.fetchReference(props);
        this.fetchOptions(props);
    };
    UnconnectedReferenceInputController.prototype.render = function () {
        var _a = this.props, input = _a.input, referenceRecord = _a.referenceRecord, matchingReferences = _a.matchingReferences, onChange = _a.onChange, children = _a.children, translate = _a.translate;
        var _b = this.state, pagination = _b.pagination, sort = _b.sort, filter = _b.filter;
        var dataStatus = getDataStatus({
            input: input,
            matchingReferences: matchingReferences,
            referenceRecord: referenceRecord,
            translate: translate,
        });
        return children({
            choices: dataStatus.choices,
            error: dataStatus.error,
            isLoading: dataStatus.waiting,
            onChange: onChange,
            filter: filter,
            setFilter: this.debouncedSetFilter,
            pagination: pagination,
            setPagination: this.setPagination,
            sort: sort,
            setSort: this.setSort,
            warning: dataStatus.warning,
        });
    };
    UnconnectedReferenceInputController.defaultProps = {
        allowEmpty: false,
        filter: {},
        filterToQuery: function (searchText) { return ({ q: searchText }); },
        matchingReferences: null,
        perPage: 25,
        sort: { field: 'id', order: 'DESC' },
        referenceRecord: null,
        referenceSource: defaultReferenceSource,
    };
    return UnconnectedReferenceInputController;
}(Component));
export { UnconnectedReferenceInputController };
var makeMapStateToProps = function () {
    return createSelector([
        getReferenceResource,
        getPossibleReferenceValues,
        function (_, props) { return props.input.value; },
    ], function (referenceState, possibleValues, inputId) { return ({
        matchingReferences: getPossibleReferences(referenceState, possibleValues, [inputId]),
        referenceRecord: referenceState && referenceState.data[inputId],
    }); });
};
var ReferenceInputController = compose(withTranslate, connect(makeMapStateToProps(), {
    crudGetManyAccumulate: crudGetManyAccumulateAction,
    crudGetMatchingAccumulate: crudGetMatchingAccumulateAction,
}))(UnconnectedReferenceInputController);
ReferenceInputController.defaultProps = {
    referenceSource: defaultReferenceSource,
};
export default ReferenceInputController;
