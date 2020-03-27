import React, { Component, ComponentType } from 'react';
import { userLogout as userLogoutAction } from './actions/authActions';
import { Dispatch, AuthProvider, AdminChildren, CustomRoutes, CatchAllComponent, LayoutComponent, LayoutProps, ResourceElement } from './types';
export interface AdminRouterProps extends LayoutProps {
    appLayout: LayoutComponent;
    catchAll: CatchAllComponent;
    children?: AdminChildren;
    customRoutes?: CustomRoutes;
    loading: ComponentType;
}
interface EnhancedProps {
    authProvider?: AuthProvider;
    isLoggedIn?: boolean;
    userLogout: Dispatch<typeof userLogoutAction>;
}
interface State {
    children: ResourceElement[];
}
export declare class CoreAdminRouter extends Component<AdminRouterProps & EnhancedProps, State> {
    static defaultProps: Partial<AdminRouterProps>;
    state: State;
    componentWillMount(): void;
    initializeResources: (nextProps: AdminRouterProps & EnhancedProps) => void;
    initializeResourcesAsync: (props: AdminRouterProps & EnhancedProps) => Promise<void>;
    componentWillReceiveProps(nextProps: any): void;
    renderCustomRoutesWithoutLayout: (route: any, props: any) => any;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<AdminRouterProps>;
export default _default;
