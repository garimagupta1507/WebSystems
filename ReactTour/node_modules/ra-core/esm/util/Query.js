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
import isEqual from 'lodash/isEqual';
import withDataProvider from './withDataProvider';
/**
 * Fetch the data provider and pass the result to a child function
 *
 * @example
 *
 * const UserProfile = ({ record }) => (
 *     <Query type="GET_ONE" resource="users" payload={{ id: record.id }}>
 *         {({ data, loading, error }) => {
 *             if (loading) { return <Loading />; }
 *             if (error) { return <p>ERROR</p>; }
 *             return <div>User {data.username}</div>;
 *         }}
 *     </Query>
 * );
 *
 * @example
 *
 * const payload = {
 *    pagination: { page: 1, perPage: 10 },
 *    sort: { field: 'username', order: 'ASC' },
 * };
 * const UserList = () => (
 *     <Query type="GET_LIST" resource="users" payload={payload}>
 *         {({ data, total, loading, error }) => {
 *             if (loading) { return <Loading />; }
 *             if (error) { return <p>ERROR</p>; }
 *             return (
 *                 <div>
 *                     <p>Total users: {total}</p>
 *                     <ul>
 *                         {data.map(user => <li key={user.username}>{user.username}</li>)}
 *                     </ul>
 *                 </div>
 *             );
 *         }}
 *     </Query>
 * );
 */
var Query = /** @class */ (function (_super) {
    __extends(Query, _super);
    function Query() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            data: null,
            total: null,
            loading: true,
            error: null,
        };
        _this.callDataProvider = function () {
            var _a = _this.props, dataProvider = _a.dataProvider, type = _a.type, resource = _a.resource, payload = _a.payload, options = _a.options;
            dataProvider(type, resource, payload, options)
                .then(function (_a) {
                var data = _a.data, total = _a.total;
                _this.setState({
                    data: data,
                    total: total,
                    loading: false,
                });
            })
                .catch(function (error) {
                _this.setState({
                    error: error,
                    loading: false,
                });
            });
        };
        _this.componentDidMount = function () {
            _this.callDataProvider();
        };
        _this.componentDidUpdate = function (prevProps) {
            if (prevProps.type !== _this.props.type ||
                prevProps.resource !== _this.props.resource ||
                !isEqual(prevProps.payload, _this.props.payload) ||
                !isEqual(prevProps.options, _this.props.options)) {
                _this.callDataProvider();
            }
        };
        return _this;
    }
    Query.prototype.render = function () {
        var children = this.props.children;
        return children(this.state);
    };
    return Query;
}(Component));
export default withDataProvider(Query);
