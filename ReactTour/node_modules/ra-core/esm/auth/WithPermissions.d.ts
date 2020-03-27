import { Component, ReactNode, ComponentType } from 'react';
import { AuthProvider } from '../types';
import { UserCheck } from './types';
import { Location } from 'history';
import { match as Match } from 'react-router';
export interface WithPermissionsChildrenParams {
    authParams?: object;
    location?: Location;
    match: Match;
    permissions: any;
}
declare type WithPermissionsChildren = (params: WithPermissionsChildrenParams) => ReactNode;
interface Props {
    authParams?: object;
    children?: WithPermissionsChildren;
    location: Location;
    match: Match;
    render?: WithPermissionsChildren;
    staticContext?: object;
}
interface EnhancedProps {
    authProvider: AuthProvider;
    isLoggedIn: boolean;
    userCheck: UserCheck;
}
/**
 * After checking that the user is authenticated,
 * retrieves the user's permissions for a specific context.
 *
 * Useful for Route components ; used internally by Resource.
 * Use it to decorate your custom page components to require
 * a custom role. It will pass the permissions as a prop to your
 * component.
 *
 * Pass the `location` from the `routeParams` as `location` prop.
 * You can set additional `authParams` at will if your authProvider
 * requires it.
 *
 * @example
 *     import { WithPermissions } from 'react-admin';
 *
 *     const Foo = ({ permissions }) => (
 *         {permissions === 'admin' ? <p>Sensitive data</p> : null}
 *         <p>Not sensitive data</p>
 *     );
 *
 *     const customRoutes = [
 *         <Route path="/foo" render={routeParams =>
 *             <WithPermissions
 *                  location={routeParams.location}
 *                  authParams={{ foo: 'bar' }}
 *                  render={props => <Foo {...props} />}
 *              />
 *         } />
 *     ];
 *     const App = () => (
 *         <Admin customRoutes={customRoutes}>
 *             ...
 *         </Admin>
 *     );
 */
export declare class WithPermissions extends Component<Props & EnhancedProps> {
    cancelled: boolean;
    state: {
        permissions: any;
    };
    componentWillMount(): void;
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: any): void;
    checkAuthentication(params: Props & EnhancedProps): void;
    checkPermissions(params: Props & EnhancedProps): Promise<void>;
    render(): ReactNode;
}
declare const _default: ComponentType<Props>;
export default _default;
