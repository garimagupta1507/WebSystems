import { ReactNode, ReactElement, ComponentType } from 'react';
import { RouteProps, RouteComponentProps, match as Match } from 'react-router';
import { WithPermissionsChildrenParams } from './auth/WithPermissions';
export declare type Identifier = string | number;
export interface Record {
    id: Identifier;
    [key: string]: any;
}
export interface RecordMap {
    [id: string]: Record;
    [id: number]: Record;
}
export interface Sort {
    field: string;
    order: string;
}
export interface Pagination {
    page: number;
    perPage: number;
}
export declare type I18nProvider = (locale: string) => object | Promise<object>;
export declare type Translate = (id: string, options?: any) => string;
export declare type AuthActionType = 'AUTH_LOGIN' | 'AUTH_LOGOUT' | 'AUTH_ERROR' | 'AUTH_CHECK' | 'AUTH_GET_PERMISSIONS';
export declare type AuthProvider = (type: AuthActionType, params?: any) => Promise<any>;
export declare type DataProvider = (type: string, resource: string, params: any) => Promise<any>;
export interface ReduxState {
    admin: {
        ui: {
            optimistic: boolean;
        };
        resources: {
            [name: string]: {
                data: any;
            };
        };
        references: {
            oneToMany: {
                [relatedTo: string]: {
                    ids: Identifier[];
                    total: number;
                };
            };
        };
        loading: number;
    };
    i18n: {
        locale: string;
        messages: object;
    };
}
export declare type Dispatch<T> = T extends (...args: infer A) => any ? (...args: A) => void : never;
export declare type ResourceElement = ReactElement<ResourceProps>;
export declare type RenderResourcesFunction = (permissions: any) => ResourceElement[] | Promise<ResourceElement[]>;
export declare type AdminChildren = RenderResourcesFunction | ReactNode;
export interface CustomRoute extends RouteProps {
    noLayout: boolean;
}
export declare type CustomRoutes = Array<ReactElement<CustomRoute>>;
export declare type TitleComponent = string | ReactElement<any>;
export declare type CatchAllComponent = ComponentType<{
    title?: TitleComponent;
}>;
interface LoginComponentProps extends RouteComponentProps {
    title?: TitleComponent;
    theme?: object;
}
export declare type LoginComponent = ComponentType<LoginComponentProps>;
export declare type DashboardComponent = ComponentType<WithPermissionsChildrenParams>;
export interface LayoutProps {
    dashboard?: DashboardComponent;
    logout: ReactNode;
    menu: ComponentType;
    theme: object;
    title?: TitleComponent;
}
export declare type LayoutComponent = ComponentType<LayoutProps>;
interface ReactAdminComponentProps {
    basePath: string;
}
interface ReactAdminComponentPropsWithId {
    id: Identifier;
    basePath: string;
}
export declare type ResourceMatch = Match<{
    id?: string;
}>;
export interface ResourceProps {
    context: 'route' | 'registration';
    match?: ResourceMatch;
    name: string;
    list?: ComponentType<ReactAdminComponentProps>;
    create?: ComponentType<ReactAdminComponentProps>;
    edit?: ComponentType<ReactAdminComponentPropsWithId>;
    show?: ComponentType<ReactAdminComponentPropsWithId>;
    icon?: ComponentType<any>;
    options: object;
}
export {};
