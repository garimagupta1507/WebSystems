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
import compose from 'recompose/compose';
import inflection from 'inflection';
import { reset } from 'redux-form';
import withTranslate from '../i18n/translate';
import { crudGetOne, crudUpdate, startUndoable as startUndoableAction, } from '../actions';
import { REDUX_FORM_NAME } from '../form';
import checkMinimumRequiredProps from './checkMinimumRequiredProps';
/**
 * Page component for the Edit view
 *
 * The `<Edit>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Edit>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Edit, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostEdit = (props) => (
 *         <Edit {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostEdit } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" edit={PostEdit} />
 *         </Admin>
 *     );
 *     export default App;
 */
var UnconnectedEditController = /** @class */ (function (_super) {
    __extends(UnconnectedEditController, _super);
    function UnconnectedEditController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.save = function (data, redirect) {
            var _a = _this.props, _b = _a.undoable, undoable = _b === void 0 ? true : _b, startUndoable = _a.startUndoable, dispatchCrudUpdate = _a.dispatchCrudUpdate;
            if (undoable) {
                startUndoable(crudUpdate(_this.props.resource, _this.props.id, data, _this.props.record, _this.props.basePath, redirect));
            }
            else {
                dispatchCrudUpdate(_this.props.resource, _this.props.id, data, _this.props.record, _this.props.basePath, redirect);
            }
        };
        return _this;
    }
    UnconnectedEditController.prototype.componentDidMount = function () {
        this.updateData();
    };
    UnconnectedEditController.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.id !== nextProps.id ||
            nextProps.version !== this.props.version) {
            this.props.resetForm(REDUX_FORM_NAME);
            this.updateData(nextProps.resource, nextProps.id);
        }
    };
    UnconnectedEditController.prototype.defaultRedirectRoute = function () {
        return 'list';
    };
    UnconnectedEditController.prototype.updateData = function (resource, id) {
        if (resource === void 0) { resource = this.props.resource; }
        if (id === void 0) { id = this.props.id; }
        this.props.crudGetOne(resource, id, this.props.basePath);
    };
    UnconnectedEditController.prototype.render = function () {
        var _a = this.props, basePath = _a.basePath, children = _a.children, id = _a.id, isLoading = _a.isLoading, record = _a.record, resource = _a.resource, translate = _a.translate, version = _a.version;
        if (!children) {
            return null;
        }
        var resourceName = translate("resources." + resource + ".name", {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        var defaultTitle = translate('ra.page.edit', {
            name: "" + resourceName,
            id: id,
            record: record,
        });
        return children({
            isLoading: isLoading,
            defaultTitle: defaultTitle,
            save: this.save,
            resource: resource,
            basePath: basePath,
            record: record,
            redirect: this.defaultRedirectRoute(),
            translate: translate,
            version: version,
        });
    };
    return UnconnectedEditController;
}(Component));
export { UnconnectedEditController };
function mapStateToProps(state, props) {
    return {
        id: props.id,
        record: state.admin.resources[props.resource]
            ? state.admin.resources[props.resource].data[props.id]
            : null,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion,
    };
}
var EditController = compose(checkMinimumRequiredProps('Edit', ['basePath', 'resource']), connect(mapStateToProps, {
    crudGetOne: crudGetOne,
    dispatchCrudUpdate: crudUpdate,
    startUndoable: startUndoableAction,
    resetForm: reset,
}), withTranslate)(UnconnectedEditController);
export default EditController;
