/// <reference types="lodash" />
import { Component, ReactNode, ReactElement, ComponentType } from 'react';
import { crudGetList as crudGetListAction } from '../actions/dataActions';
import { changeListParams as changeListParamsAction, ListParams } from '../actions/listActions';
import { Sort, AuthProvider, RecordMap, Identifier, Translate, Dispatch } from '../types';
import { Location, LocationDescriptorObject, LocationState } from 'history';
interface ChildrenFuncParams {
    basePath: string;
    currentSort: Sort;
    data: RecordMap;
    defaultTitle: string;
    displayedFilters: any;
    filterValues: any;
    hasCreate: boolean;
    hideFilter: (filterName: string) => void;
    ids: Identifier[];
    isLoading: boolean;
    loadedOnce: boolean;
    onSelect: (ids: Identifier[]) => void;
    onToggleItem: (id: Identifier) => void;
    onUnselectItems: () => void;
    page: number;
    perPage: number;
    resource: string;
    selectedIds: Identifier[];
    setFilters: (filters: any) => void;
    setPage: (page: number) => void;
    setPerPage: (page: number) => void;
    setSort: (sort: Sort) => void;
    showFilter: (filterName: string, defaultValue: any) => void;
    translate: Translate;
    total: number;
    version: number;
}
interface Props {
    children: (params: ChildrenFuncParams) => ReactNode;
    filter?: object;
    filters?: ReactElement<any>;
    filterDefaultValues?: object;
    pagination?: ReactElement<any>;
    perPage: number;
    sort: Sort;
    authProvider?: AuthProvider;
    basePath: string;
    debounce?: number;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    location: Location;
    path?: string;
    query: ListParams;
    resource: string;
    [key: string]: any;
}
interface EnhancedProps {
    changeListParams: Dispatch<typeof changeListParamsAction>;
    crudGetList: Dispatch<typeof crudGetListAction>;
    data?: RecordMap;
    ids?: Identifier[];
    isLoading: boolean;
    loadedOnce?: boolean;
    params: ListParams;
    push: (location: LocationDescriptorObject<LocationState>) => void;
    selectedIds?: Identifier[];
    setSelectedIds: (resource: string, ids: Identifier[]) => void;
    toggleItem: (resource: string, id: Identifier) => void;
    total: number;
    translate: Translate;
    version?: number;
}
/**
 * List page component
 *
 * The <List> component renders the list layout (title, buttons, filters, pagination),
 * and fetches the list of records from the REST API.
 * It then delegates the rendering of the list of records to its child component.
 * Usually, it's a <Datagrid>, responsible for displaying a table with one row for each post.
 *
 * In Redux terms, <List> is a connected component, and <Datagrid> is a dumb component.
 *
 * Props:
 *   - title
 *   - perPage
 *   - sort
 *   - filter (the permanent filter to apply to the query)
 *   - actions
 *   - filters (a React Element used to display the filter form)
 *   - pagination
 *
 * @example
 *     const PostFilter = (props) => (
 *         <Filter {...props}>
 *             <TextInput label="Search" source="q" alwaysOn />
 *             <TextInput label="Title" source="title" />
 *         </Filter>
 *     );
 *     export const PostList = (props) => (
 *         <List {...props}
 *             title="List of posts"
 *             sort={{ field: 'published_at' }}
 *             filter={{ is_published: true }}
 *             filters={<PostFilter />}
 *         >
 *             <Datagrid>
 *                 <TextField source="id" />
 *                 <TextField source="title" />
 *                 <EditButton />
 *             </Datagrid>
 *         </List>
 *     );
 */
export declare class UnconnectedListController extends Component<Props & EnhancedProps> {
    static defaultProps: Partial<Props>;
    state: {};
    setFilters: ((filters: any) => void) & import("lodash").Cancelable;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Props & EnhancedProps): void;
    shouldComponentUpdate(nextProps: Props & EnhancedProps, nextState: any): boolean;
    /**
     * Merge list params from 4 different sources:
     *   - the query string
     *   - the params stored in the state (from previous navigation)
     *   - the props passed to the List component
     */
    getQuery(props?: Readonly<{
        children?: ReactNode;
    }> & Readonly<Props & EnhancedProps>): ListParams;
    getFilterValues(): any;
    updateData(props?: Readonly<{
        children?: ReactNode;
    }> & Readonly<Props & EnhancedProps>): void;
    setSort: (sort: any) => void;
    setPage: (page: any) => void;
    setPerPage: (perPage: any) => void;
    showFilter: (filterName: string, defaultValue: any) => void;
    hideFilter: (filterName: string) => void;
    handleSelect: (ids: import("react").ReactText[]) => void;
    handleUnselectItems: () => void;
    handleToggleItem: (id: import("react").ReactText) => void;
    changeParams(action: any): void;
    render(): ReactNode;
}
/**
 * Select the props injected by the ListController
 * to be passed to the List children need
 * This is an implementation of pick()
 */
export declare const getListControllerProps: (props: any) => {};
/**
 * Select the props not injected by the ListController
 * to be used inside the List children to sanitize props injected by List
 * This is an implementation of omit()
 */
export declare const sanitizeListRestProps: (props: any) => {};
declare const _default: ComponentType<Props>;
export default _default;
