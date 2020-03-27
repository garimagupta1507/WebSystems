import { Component, ReactNode, ComponentType } from 'react';
import { WrappedFieldInputProps } from 'redux-form';
import { crudGetManyAccumulate as crudGetManyAccumulateAction, crudGetMatchingAccumulate as crudGetMatchingAccumulateAction } from '../../actions/accumulateActions';
import { Sort, Translate, Record, Pagination, Dispatch } from '../../types';
import { MatchingReferencesError } from './types';
declare const defaultReferenceSource: (resource: string, source: string) => string;
interface ChildrenFuncParams {
    choices: Record[];
    error?: string;
    filter?: any;
    isLoading: boolean;
    onChange: (value: any) => void;
    pagination: Pagination;
    setFilter: (filter: any) => void;
    setPagination: (pagination: Pagination) => void;
    setSort: (sort: Sort) => void;
    sort: Sort;
    warning?: string;
}
interface Props {
    allowEmpty?: boolean;
    basePath: string;
    children: (params: ChildrenFuncParams) => ReactNode;
    filter?: object;
    filterToQuery: (filter: {}) => any;
    input?: WrappedFieldInputProps;
    perPage: number;
    record?: Record;
    reference: string;
    referenceSource: typeof defaultReferenceSource;
    resource: string;
    sort?: Sort;
    source: string;
}
interface EnhancedProps {
    crudGetMatchingAccumulate: Dispatch<typeof crudGetMatchingAccumulateAction>;
    crudGetManyAccumulate: Dispatch<typeof crudGetManyAccumulateAction>;
    matchingReferences?: Record[] | MatchingReferencesError;
    onChange: () => void;
    referenceRecord?: Record;
    translate: Translate;
}
interface State {
    pagination: Pagination;
    sort: Sort;
    filter: any;
}
/**
 * An Input component for choosing a reference record. Useful for foreign keys.
 *
 * This component fetches the possible values in the reference resource
 * (using the `CRUD_GET_MATCHING` REST method), then delegates rendering
 * to a subcomponent, to which it passes the possible choices
 * as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<AutocompleteInput>`,
 * `<SelectInput>`, or `<RadioButtonGroupInput>`.
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <AutocompleteInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <SelectInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      perPage={100}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      sort={{ field: 'title', order: 'ASC' }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filter={{ is_published: true }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * The enclosed component may filter results. ReferenceInput passes a `setFilter`
 * function as prop to its child component. It uses the value to create a filter
 * for the query - by default { q: [searchText] }. You can customize the mapping
 * searchText => searchQuery by setting a custom `filterToQuery` function prop:
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filterToQuery={searchText => ({ title: searchText })}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 */
export declare class UnconnectedReferenceInputController extends Component<Props & EnhancedProps, State> {
    static defaultProps: {
        allowEmpty: boolean;
        filter: {};
        filterToQuery: (searchText: any) => {
            q: any;
        };
        matchingReferences: any;
        perPage: number;
        sort: {
            field: string;
            order: string;
        };
        referenceRecord: any;
        referenceSource: (resource: string, source: string) => string;
    };
    state: State;
    private debouncedSetFilter;
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props & EnhancedProps): void;
    setFilter: (filter: any) => void;
    setPagination: (pagination: Pagination) => void;
    setSort: (sort: Sort) => void;
    fetchReference: (props?: Readonly<{
        children?: ReactNode;
    }> & Readonly<Props & EnhancedProps>) => void;
    fetchOptions: (props?: Readonly<{
        children?: ReactNode;
    }> & Readonly<Props & EnhancedProps>) => void;
    fetchReferenceAndOptions(props: any): void;
    render(): ReactNode;
}
declare const _default: ComponentType<Props>;
export default _default;
