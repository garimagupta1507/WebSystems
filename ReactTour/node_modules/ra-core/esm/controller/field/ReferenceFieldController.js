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
import { linkToRecord } from '../../util';
/**
 * Fetch reference record, and delegate rendering to child component.
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * By default, includes a link to the <Edit> page of the related record
 * (`/users/:userId` in the previous example).
 *
 * Set the linkType prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType="show">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * You can also prevent `<ReferenceField>` from adding link to children by setting
 * `linkType` to false.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType={false}>
 *     <TextField source="name" />
 * </ReferenceField>
 */
var UnconnectedReferenceFieldController = /** @class */ (function (_super) {
    __extends(UnconnectedReferenceFieldController, _super);
    function UnconnectedReferenceFieldController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnconnectedReferenceFieldController.prototype.componentDidMount = function () {
        this.fetchReference(this.props);
    };
    UnconnectedReferenceFieldController.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.record.id !== nextProps.record.id) {
            this.fetchReference(nextProps);
        }
    };
    UnconnectedReferenceFieldController.prototype.fetchReference = function (props) {
        var source = get(props.record, props.source);
        if (source !== null && typeof source !== 'undefined') {
            this.props.crudGetManyAccumulate(props.reference, [source]);
        }
    };
    UnconnectedReferenceFieldController.prototype.render = function () {
        var _a = this.props, allowEmpty = _a.allowEmpty, basePath = _a.basePath, children = _a.children, linkType = _a.linkType, record = _a.record, reference = _a.reference, referenceRecord = _a.referenceRecord, resource = _a.resource, source = _a.source;
        var rootPath = basePath.replace(resource, reference);
        var resourceLinkPath = !linkType
            ? false
            : linkToRecord(rootPath, get(record, source), linkType);
        return children({
            isLoading: !referenceRecord && !allowEmpty,
            referenceRecord: referenceRecord,
            resourceLinkPath: resourceLinkPath,
        });
    };
    UnconnectedReferenceFieldController.defaultProps = {
        allowEmpty: false,
        linkType: 'edit',
        referenceRecord: null,
        record: { id: '' },
    };
    return UnconnectedReferenceFieldController;
}(Component));
export { UnconnectedReferenceFieldController };
var mapStateToProps = function (state, props) { return ({
    referenceRecord: state.admin.resources[props.reference] &&
        state.admin.resources[props.reference].data[get(props.record, props.source)],
}); };
var ReferenceFieldController = connect(mapStateToProps, {
    crudGetManyAccumulate: crudGetManyAccumulateAction,
})(UnconnectedReferenceFieldController);
export default ReferenceFieldController;
