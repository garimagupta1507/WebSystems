import React, { Component, ReactElement } from 'react';
import { UserCheck } from './types';
interface Props {
    authParams?: object;
    children: ReactElement<any>;
    location: object;
    userCheck: UserCheck;
}
/**
 * Restrict access to children to authenticated users
 *
 * Useful for Route components ; used internally by Resource.
 * Use it to decorate your custom page components to require
 * authentication.
 *
 * Pass the `location` from the `routeParams` as `location` prop.
 * You can set additional `authParams` at will if your authProvider
 * requires it.
 *
 * @example
 *     import { Authenticated } from 'react-admin';
 *
 *     const CustomRoutes = [
 *         <Route path="/foo" render={routeParams =>
 *             <Authenticated location={routeParams.location} authParams={{ foo: 'bar' }}>
 *                 <Foo />
 *             </Authenticated>
 *         } />
 *     ];
 *     const App = () => (
 *         <Admin customRoutes={customRoutes}>
 *             ...
 *         </Admin>
 *     );
 */
export declare class Authenticated extends Component<Props> {
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    checkAuthentication(params: any): void;
    render(): React.ReactElement<any>;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof Authenticated, Pick<Props, "children" | "authParams" | "location">>;
export default _default;
