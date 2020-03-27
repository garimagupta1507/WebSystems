import { Component, ReactNode, ComponentType } from 'react';
import { crudGetOne as crudGetOneAction } from '../actions';
import { Translate, Record, Dispatch, Identifier } from '../types';
interface ChildrenFuncParams {
    isLoading: boolean;
    defaultTitle: string;
    resource: string;
    basePath: string;
    record?: Record;
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
    isLoading: boolean;
    resource: string;
}
interface EnhancedProps {
    crudGetOne: Dispatch<typeof crudGetOneAction>;
    id: Identifier;
    record?: Record;
    translate: Translate;
    version: number;
}
/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Show>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
export declare class UnconnectedShowController extends Component<Props & EnhancedProps> {
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props & EnhancedProps): void;
    updateData(resource?: string, id?: import("react").ReactText): void;
    render(): {};
}
declare const _default: ComponentType<Props>;
export default _default;
