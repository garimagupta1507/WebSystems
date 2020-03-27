import { Component, ReactNode, ComponentType } from 'react';
import { crudCreate as crudCreateAction } from '../actions';
import { Location } from 'history';
import { match as Match } from 'react-router';
import { Record, Translate, Dispatch } from '../types';
import { RedirectionSideEffect } from '../sideEffect';
interface ChildrenFuncParams {
    isLoading: boolean;
    defaultTitle: string;
    save: (record: Partial<Record>, redirect: RedirectionSideEffect) => void;
    resource: string;
    basePath: string;
    record?: Partial<Record>;
    redirect: RedirectionSideEffect;
    translate: Translate;
}
interface Props {
    basePath: string;
    children: (params: ChildrenFuncParams) => ReactNode;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    location: Location;
    match: Match;
    record?: Partial<Record>;
    resource: string;
}
interface EnhancedProps {
    crudCreate: Dispatch<typeof crudCreateAction>;
    isLoading: boolean;
    translate: Translate;
}
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
export declare class UnconnectedCreateController extends Component<Props & EnhancedProps> {
    static defaultProps: Partial<Props>;
    private record;
    constructor(props: any);
    defaultRedirectRoute(): "edit" | "show" | "list";
    save: (record: Partial<Record>, redirect: RedirectionSideEffect) => void;
    render(): {};
}
declare const _default: ComponentType<Props>;
export default _default;
