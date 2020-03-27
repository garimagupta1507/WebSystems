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
var withDataProvider_1 = __importDefault(require("./withDataProvider"));
/**
 * Craft a callback to fetch the data provider and pass it to a child function
 *
 * @example
 *
 * const ApproveButton = ({ record }) => (
 *     <Mutation
 *         type="UPDATE"
 *         resource="comments"
 *         payload={{ id: record.id, data: { isApproved: true } }}
 *     >
 *         {(approve) => (
 *             <FlatButton label="Approve" onClick={approve} />
 *         )}
 *     </Mutation>
 * );
 */
var Mutation = /** @class */ (function (_super) {
    __extends(Mutation, _super);
    function Mutation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            data: null,
            loading: false,
            error: null,
        };
        _this.mutate = function () {
            _this.setState({ loading: true });
            var _a = _this.props, dataProvider = _a.dataProvider, type = _a.type, resource = _a.resource, payload = _a.payload, options = _a.options;
            dataProvider(type, resource, payload, options)
                .then(function (_a) {
                var data = _a.data;
                _this.setState({
                    data: data,
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
        return _this;
    }
    Mutation.prototype.render = function () {
        var children = this.props.children;
        return children(this.mutate, this.state);
    };
    return Mutation;
}(react_1.Component));
exports.default = withDataProvider_1.default(Mutation);
