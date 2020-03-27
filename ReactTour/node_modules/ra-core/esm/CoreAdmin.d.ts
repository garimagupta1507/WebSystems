import React, { ComponentType } from 'react';
import { History } from 'history';
import { AuthProvider, I18nProvider, DataProvider, TitleComponent, LoginComponent, LayoutComponent, AdminChildren, CatchAllComponent, CustomRoutes, DashboardComponent } from './types';
export declare type ChildrenFunction = () => ComponentType[];
export interface AdminProps {
    appLayout: LayoutComponent;
    authProvider?: AuthProvider;
    children?: AdminChildren;
    catchAll: CatchAllComponent;
    customSagas?: any[];
    customReducers?: object;
    customRoutes?: CustomRoutes;
    dashboard?: DashboardComponent;
    dataProvider: DataProvider;
    history: History;
    i18nProvider?: I18nProvider;
    initialState?: object;
    loading: ComponentType;
    locale?: string;
    loginPage: LoginComponent | boolean;
    logoutButton?: ComponentType;
    menu?: ComponentType;
    theme?: object;
    title?: TitleComponent;
}
declare const CoreAdmin: React.ComponentType<AdminProps>;
export default CoreAdmin;
