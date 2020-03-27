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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var get_1 = __importDefault(require("lodash/get"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var actions_1 = require("../../actions");
var queryReducer_1 = require("../../reducer/admin/resource/list/queryReducer");
var oneToMany_1 = require("../../reducer/admin/references/oneToMany");
/**
 * Render related records to the current one.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 *
 * @example Display all the books by the current author, only the title
 * <ReferenceManyField reference="books" target="author_id">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceManyField perPage={10} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceManyField sort={{ field: 'created_at', order: 'DESC' }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceManyField filter={{ is_published: true }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 */
var UnconnectedReferenceManyFieldController = /** @class */ (function (_super) {
    __extends(UnconnectedReferenceManyFieldController, _super);
    function UnconnectedReferenceManyFieldController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            sort: _this.props.sort,
            page: 1,
            perPage: _this.props.perPage,
        };
        _this.setSort = function (field) {
            var order = _this.state.sort.field === field &&
                _this.state.sort.order === queryReducer_1.SORT_ASC
                ? queryReducer_1.SORT_DESC
                : queryReducer_1.SORT_ASC;
            _this.setState({ sort: { field: field, order: order } }, _this.fetchReferences);
        };
        _this.setPage = function (page) { return _this.setState({ page: page }, _this.fetchReferences); };
        _this.setPerPage = function (perPage) {
            return _this.setState({ perPage: perPage }, _this.fetchReferences);
        };
        return _this;
    }
    UnconnectedReferenceManyFieldController.prototype.componentDidMount = function () {
        this.fetchReferences();
    };
    UnconnectedReferenceManyFieldController.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.record.id !== nextProps.record.id ||
            !isEqual_1.default(this.props.filter, nextProps.filter)) {
            this.fetchReferences(nextProps);
        }
        if (!isEqual_1.default(this.props.sort, nextProps.sort)) {
            this.setState({ sort: nextProps.sort }, this.fetchReferences);
        }
    };
    UnconnectedReferenceManyFieldController.prototype.fetchReferences = function (_a) {
        var _b = _a === void 0 ? this.props : _a, reference = _b.reference, record = _b.record, resource = _b.resource, target = _b.target, filter = _b.filter, source = _b.source;
        var crudGetManyReference = this.props.crudGetManyReference;
        var _c = this.state, page = _c.page, perPage = _c.perPage, sort = _c.sort;
        var relatedTo = oneToMany_1.nameRelatedTo(reference, get_1.default(record, source), resource, target, filter);
        crudGetManyReference(reference, target, get_1.default(record, source), relatedTo, { page: page, perPage: perPage }, sort, filter, source);
    };
    UnconnectedReferenceManyFieldController.prototype.render = function () {
        var _a = this.props, resource = _a.resource, reference = _a.reference, data = _a.data, ids = _a.ids, children = _a.children, basePath = _a.basePath, total = _a.total;
        var _b = this.state, page = _b.page, perPage = _b.perPage;
        var referenceBasePath = basePath.replace(resource, reference);
        return children({
            currentSort: this.state.sort,
            data: data,
            ids: ids,
            loadedOnce: typeof ids !== 'undefined',
            page: page,
            perPage: perPage,
            referenceBasePath: referenceBasePath,
            setPage: this.setPage,
            setPerPage: this.setPerPage,
            setSort: this.setSort,
            total: total,
        });
    };
    UnconnectedReferenceManyFieldController.defaultProps = {
        filter: {},
        perPage: 25,
        sort: { field: 'id', order: 'DESC' },
        source: 'id',
    };
    return UnconnectedReferenceManyFieldController;
}(react_1.Component));
exports.UnconnectedReferenceManyFieldController = UnconnectedReferenceManyFieldController;
function mapStateToProps(state, props) {
    var relatedTo = oneToMany_1.nameRelatedTo(props.reference, get_1.default(props.record, props.source), props.resource, props.target, props.filter);
    return {
        data: oneToMany_1.getReferences(state, props.reference, relatedTo),
        ids: oneToMany_1.getIds(state, relatedTo),
        total: oneToMany_1.getTotal(state, relatedTo),
    };
}
var ReferenceManyFieldController = react_redux_1.connect(mapStateToProps, {
    crudGetManyReference: actions_1.crudGetManyReference,
})(UnconnectedReferenceManyFieldController);
exports.default = ReferenceManyFieldController;
