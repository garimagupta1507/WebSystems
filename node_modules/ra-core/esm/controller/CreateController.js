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
import { parse } from 'query-string';
import withTranslate from '../i18n/translate';
import { crudCreate as crudCreateAction } from '../actions';
import checkMinimumRequiredProps from './checkMinimumRequiredProps';
/**
 * Page component for the Create view
 *
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Create>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Create, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostCreate = (props) => (
 *         <Create {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Create>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostCreate } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" create={PostCreate} />
 *         </Admin>
 *     );
 *     export default App;
 */
var UnconnectedCreateController = /** @class */ (function (_super) {
    __extends(UnconnectedCreateController, _super);
    function UnconnectedCreateController(props) {
        var _this = _super.call(this, props) || this;
        _this.save = function (record, redirect) {
            _this.props.crudCreate(_this.props.resource, record, _this.props.basePath, redirect);
        };
        var _a = _this.props, _b = _a.location, state = _b.state, search = _b.search, record = _a.record;
        _this.record =
            state && state.record
                ? state.record
                : search
                    ? parse(search, { arrayFormat: 'bracket' })
                    : record;
        return _this;
    }
    UnconnectedCreateController.prototype.defaultRedirectRoute = function () {
        var _a = this.props, hasShow = _a.hasShow, hasEdit = _a.hasEdit;
        if (hasEdit) {
            return 'edit';
        }
        if (hasShow) {
            return 'show';
        }
        return 'list';
    };
    UnconnectedCreateController.prototype.render = function () {
        var _a = this.props, basePath = _a.basePath, children = _a.children, isLoading = _a.isLoading, resource = _a.resource, translate = _a.translate;
        if (!children) {
            return null;
        }
        var resourceName = translate("resources." + resource + ".name", {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        var defaultTitle = translate('ra.page.create', {
            name: "" + resourceName,
        });
        return children({
            isLoading: isLoading,
            defaultTitle: defaultTitle,
            save: this.save,
            resource: resource,
            basePath: basePath,
            record: this.record,
            redirect: this.defaultRedirectRoute(),
            translate: translate,
        });
    };
    UnconnectedCreateController.defaultProps = {
        record: {},
    };
    return UnconnectedCreateController;
}(Component));
export { UnconnectedCreateController };
function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
    };
}
var CreateController = compose(checkMinimumRequiredProps('Create', ['basePath', 'location', 'resource']), connect(mapStateToProps, { crudCreate: crudCreateAction }), withTranslate)(UnconnectedCreateController);
export default CreateController;
