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
import withTranslate from '../i18n/translate';
import { crudGetOne as crudGetOneAction } from '../actions';
import checkMinimumRequiredProps from './checkMinimumRequiredProps';
/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Show>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
var UnconnectedShowController = /** @class */ (function (_super) {
    __extends(UnconnectedShowController, _super);
    function UnconnectedShowController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnconnectedShowController.prototype.componentDidMount = function () {
        this.updateData();
    };
    UnconnectedShowController.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.id !== nextProps.id ||
            nextProps.version !== this.props.version) {
            this.updateData(nextProps.resource, nextProps.id);
        }
    };
    UnconnectedShowController.prototype.updateData = function (resource, id) {
        if (resource === void 0) { resource = this.props.resource; }
        if (id === void 0) { id = this.props.id; }
        this.props.crudGetOne(resource, id, this.props.basePath);
    };
    UnconnectedShowController.prototype.render = function () {
        var _a = this.props, basePath = _a.basePath, children = _a.children, id = _a.id, isLoading = _a.isLoading, record = _a.record, resource = _a.resource, translate = _a.translate, version = _a.version;
        if (!children) {
            return null;
        }
        var resourceName = translate("resources." + resource + ".name", {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        var defaultTitle = translate('ra.page.show', {
            name: "" + resourceName,
            id: id,
            record: record,
        });
        return children({
            isLoading: isLoading,
            defaultTitle: defaultTitle,
            resource: resource,
            basePath: basePath,
            record: record,
            translate: translate,
            version: version,
        });
    };
    return UnconnectedShowController;
}(Component));
export { UnconnectedShowController };
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
var ShowController = compose(checkMinimumRequiredProps('Show', ['basePath', 'resource']), connect(mapStateToProps, { crudGetOne: crudGetOneAction }), withTranslate)(UnconnectedShowController);
export default ShowController;
