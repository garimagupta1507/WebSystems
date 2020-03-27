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
import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { crudGetManyAccumulate as crudGetManyAccumulateAction } from '../../actions';
import { getReferencesByIds } from '../../reducer/admin/references/oneToMany';
/**
 * A container component that fetches records from another resource specified
 * by an array of *ids* in current record.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the products of the current order as datagrid
 * // order = {
 * //   id: 123,
 * //   product_ids: [456, 457, 458],
 * // }
 * <ReferenceArrayField label="Products" reference="products" source="product_ids">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="description" />
 *         <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceArrayField>
 *
 * @example Display all the categories of the current product as a list of chips
 * // product = {
 * //   id: 456,
 * //   category_ids: [11, 22, 33],
 * // }
 * <ReferenceArrayField label="Categories" reference="categories" source="category_ids">
 *     <SingleFieldList>
 *         <ChipField source="name" />
 *     </SingleFieldList>
 * </ReferenceArrayField>
 *
 */
var UnconnectedReferenceArrayFieldController = /** @class */ (function (_super) {
    __extends(UnconnectedReferenceArrayFieldController, _super);
    function UnconnectedReferenceArrayFieldController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnconnectedReferenceArrayFieldController.prototype.componentDidMount = function () {
        this.fetchReferences();
    };
    UnconnectedReferenceArrayFieldController.prototype.componentWillReceiveProps = function (nextProps) {
        if ((this.props.record || { id: undefined }).id !==
            (nextProps.record || {}).id) {
            this.fetchReferences(nextProps);
        }
    };
    UnconnectedReferenceArrayFieldController.prototype.fetchReferences = function (_a) {
        var _b = _a === void 0 ? this.props : _a, crudGetManyAccumulate = _b.crudGetManyAccumulate, reference = _b.reference, ids = _b.ids;
        crudGetManyAccumulate(reference, ids);
    };
    UnconnectedReferenceArrayFieldController.prototype.render = function () {
        var _a = this.props, resource = _a.resource, reference = _a.reference, data = _a.data, ids = _a.ids, children = _a.children, basePath = _a.basePath;
        var referenceBasePath = basePath.replace(resource, reference); // FIXME obviously very weak
        return children({
            loadedOnce: data != undefined,
            ids: ids,
            data: data,
            referenceBasePath: referenceBasePath,
            currentSort: {
                field: 'id',
                order: 'ASC',
            },
        });
    };
    return UnconnectedReferenceArrayFieldController;
}(Component));
export { UnconnectedReferenceArrayFieldController };
var mapStateToProps = function (state, props) {
    var record = props.record, source = props.source, reference = props.reference;
    var ids = get(record, source) || [];
    return {
        data: getReferencesByIds(state, reference, ids),
        ids: ids,
    };
};
var ReferenceArrayFieldController = connect(mapStateToProps, {
    crudGetManyAccumulate: crudGetManyAccumulateAction,
})(UnconnectedReferenceArrayFieldController);
export default ReferenceArrayFieldController;
