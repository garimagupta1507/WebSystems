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
import { connect } from 'react-redux';
import get from 'lodash/get';
import { startUndoable } from '../actions/undoActions';
var mapDispatchToProps = function (dispatch) { return ({
    dataProvider: function (type, resource, payload, meta) {
        if (meta === void 0) { meta = {}; }
        return new Promise(function (resolve, reject) {
            var onSuccess = get(meta, 'onSuccess', {});
            var onFailure = get(meta, 'onFailure', {});
            var action = {
                type: 'CUSTOM_FETCH',
                payload: payload,
                meta: __assign({}, meta, { resource: resource, fetch: type, onSuccess: __assign({}, onSuccess, { callback: function (_a) {
                            var response = _a.payload;
                            if (onSuccess.callback) {
                                onSuccess.callback(response);
                            }
                            resolve(response);
                        } }), onFailure: __assign({}, get(meta, 'onFailure', {}), { callback: function (_a) {
                            var error = _a.error;
                            var sanitizedError = new Error(error.message ? error.message : error);
                            if (onFailure.callback) {
                                onFailure.callback(sanitizedError);
                            }
                            reject(sanitizedError);
                        } }) }),
            };
            return meta.undoable
                ? dispatch(startUndoable(action))
                : dispatch(action);
        });
    },
    dispatch: dispatch,
}); };
/**
 * Higher-order component for fetching the dataProvider
 *
 * Injects a dataProvider function prop, which behaves just like
 * the dataProvider function (same signature, returns a Promise), but
 * uses Redux under the hood. The benefit is that react-admin tracks
 * the loading state when using this function, and shows the loader animation
 * while the dataProvider is waiting for a response.
 *
 * In addition to the 3 parameters of the dataProvider function (verb, resource, payload),
 * the injected dataProvider prop accepts a fourth parameter, an object literal
 * which may contain side effects, of make the action optimistic (with undoable: true).
 *
 * As it uses connect() from react-redux, this HOC also injects the dispatch prop,
 * allowing developers to dispatch additional actions upon completion.
 *
 * @example
 *
 * import { withDataProvider, showNotification } from 'react-admin';
 * class PostList extends Component {
 *     state = {
 *         posts: [],
 *     }
 *
 *     componentDidMount() {
 *         const { dataProvider, dispatch } = this.props;
 *         dataProvider('GET_LIST', 'posts', { filter: { status: 'pending' }})
 *            .then(({ data: posts }) => this.setState({ posts }))
 *            .catch(error => dispatch(showNotification(error.message, 'error')))
 *     }
 *
 *     render() {
 *         const { posts } = this.state;
 *         return (
 *            <Fragment>
 *                {posts.map((post, index) => <PostDetail post={post} key={key} />)}
 *            </Fragment>
 *         );
 *     }
 * }
 *
 * PostList.propTypes = {
 *     dataProvider: PropTypes.func.isRequired,
 * };
 *
 * export default withDataProvider(PostList);
 */
var withDataProvider = function (Component) {
    return connect(null, mapDispatchToProps)(Component);
};
export default withDataProvider;
