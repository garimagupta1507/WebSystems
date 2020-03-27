import { Component, ReactNode, ComponentType } from 'react';
import { WrappedFieldInputProps } from 'redux-form';
import { crudGetMany as crudGetManyAction, crudGetMatching as crudGetMatchingAction } from '../../actions/dataActions';
import { Record, Sort, Translate, Pagination, Dispatch } from '../../types';
import { MatchingReferencesError } from './types';
declare const defaultReferenceSource: (resource: string, source: string) => string;
interface ChildrenFuncParams {
    choices: Record[];
    error?: string;
    isLoading: boolean;
    onChange: (value: any) => void;
    setFilter: (filter: any) => void;
    setPagination: (pagination: Pagination) => void;
    setSort: (sort: Sort) => void;
    warning?: string;
}
interface Props {
    allowEmpty?: boolean;
    basePath: string;
    children: (params: ChildrenFuncParams) => ReactNode;
    filter?: object;
    filterToQuery: (filter: {}) => any;
    input?: WrappedFieldInputProps;
    meta?: object;
    perPage?: number;
    record?: Record;
    reference: string;
    referenceSource: typeof defaultReferenceSource;
    resource: string;
    sort?: Sort;
    source: string;
}
interface EnhancedProps {
    crudGetMatching: Dispatch<typeof crudGetMatchingAction>;
    crudGetMany: Dispatch<typeof crudGetManyAction>;
    matchingReferences?: Record[] | MatchingReferencesError;
    onChange?: () => void;
    referenceRecords?: Record[];
    translate: Translate;
}
/**
 * An Input component for fields containing a list of references to another resource.
 * Useful for 'hasMany' relationship.
 *
 * @example
 * The post object has many tags, so the post resource looks like:
 * {
 *    id: 1234,
 *    tag_ids: [ "1", "23", "4" ]
 * }
 *
 * ReferenceArrayInput component fetches the current resources (using the
 * `CRUD_GET_MANY` REST method) as well as possible resources (using the
 * `CRUD_GET_MATCHING` REST method) in the reference endpoint. It then
 * delegates rendering to a subcomponent, to which it passes the possible
 * choices as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<SelectArrayInput>`
 * or <CheckboxGroupInput>.
 *
 * @example
 * export const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceArrayInput source="tag_ids" reference="tags">
 *                 <SelectArrayInput optionText="name" />
 *             </ReferenceArrayInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      perPage={100}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      sort={{ field: 'name', order: 'ASC' }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filter={{ is_public: true }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * The enclosed component may filter results. ReferenceArrayInput passes a
 * `setFilter` function as prop to its child component. It uses the value to
 * create a filter for the query - by default { q: [searchText] }. You can
 * customize the mapping searchText => searchQuery by setting a custom
 * `filterToQuery` function prop:
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filterToQuery={searchText => ({ name: searchText })}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 */
export declare class UnconnectedReferenceArrayInputController extends Component<Props & EnhancedProps> {
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
        referenceRecords: any[];
        referenceSource: (resource: string, source: string) => string;
    };
    private params;
    private debouncedSetFilter;
    constructor(props: Props & EnhancedProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props & EnhancedProps): void;
    setFilter: (filter: any) => void;
    setPagination: (pagination: Pagination) => void;
    setSort: (sort: Sort) => void;
    fetchReferences: (nextProps: any, currentProps?: Readonly<{
        children?: ReactNode;
    }> & Readonly<Props & EnhancedProps>) => void;
    fetchOptions: (props?: Readonly<{
        children?: ReactNode;
    }> & Readonly<Props & EnhancedProps>) => void;
    fetchReferencesAndOptions(nextProps: any, currentProps?: Readonly<{
        children?: ReactNode;
    }> & Readonly<Props & EnhancedProps>): void;
    render(): ReactNode;
}
declare const _default: ComponentType<Props>;
export default _default;
