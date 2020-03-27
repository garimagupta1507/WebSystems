import { Component, ReactNode, ComponentType } from 'react';
import { crudGetOne, crudUpdate, startUndoable as startUndoableAction } from '../actions';
import { Translate, Record, Dispatch, Identifier } from '../types';
import { RedirectionSideEffect } from '../sideEffect';
interface ChildrenFuncParams {
    isLoading: boolean;
    defaultTitle: string;
    save: (data: Record, redirect: RedirectionSideEffect) => void;
    resource: string;
    basePath: string;
    record?: Record;
    redirect: RedirectionSideEffect;
    translate: Translate;
    version: number;
}
interface Props {
    basePath: string;
    children: (params: ChildrenFuncParams) => ReactNode;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasShow?: boolean;
    hasList?: boolean;
    id: Identifier;
    isLoading: boolean;
    resource: string;
    undoable?: boolean;
}
interface EnhancedProps {
    crudGetOne: Dispatch<typeof crudGetOne>;
    dispatchCrudUpdate: Dispatch<typeof crudUpdate>;
    record?: Record;
    resetForm: (form: string) => void;
    startUndoable: Dispatch<typeof startUndoableAction>;
    translate: Translate;
    version: number;
}
/**
 * Page component for the Edit view
 *
 * The `<Edit>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Edit>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Edit, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostEdit = (props) => (
 *         <Edit {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostEdit } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" edit={PostEdit} />
 *         </Admin>
 *     );
 *     export default App;
 */
export declare class UnconnectedEditController extends Component<Props & EnhancedProps> {
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props & EnhancedProps): void;
    defaultRedirectRoute(): string;
    updateData(resource?: string, id?: import("react").ReactText): void;
    save: (data: any, redirect: any) => void;
    render(): {};
}
declare const _default: ComponentType<Props>;
export default _default;
