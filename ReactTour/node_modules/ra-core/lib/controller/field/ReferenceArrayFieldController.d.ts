import { Component, ReactNode } from 'react';
import { crudGetManyAccumulate as crudGetManyAccumulateAction } from '../../actions';
import { Record, RecordMap, Dispatch, Sort, Identifier } from '../../types';
interface ChildrenFuncParams {
    loadedOnce: boolean;
    ids: Identifier[];
    data: RecordMap;
    referenceBasePath: string;
    currentSort: Sort;
}
interface Props {
    basePath: string;
    children: (params: ChildrenFuncParams) => ReactNode;
    crudGetManyAccumulate: Dispatch<typeof crudGetManyAccumulateAction>;
    data?: RecordMap;
    ids: Identifier[];
    record?: Record;
    reference: string;
    resource: string;
    source: string;
}
/**
 * A container component that fetches records from another resource specified
 * by an array of *ids* in current record.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the products of the current order as datagrid
 * // order = {
 * //   id: 123,
 * //   product_ids: [456, 457, 458],
 * // }
 * <ReferenceArrayField label="Products" reference="products" source="product_ids">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="description" />
 *         <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceArrayField>
 *
 * @example Display all the categories of the current product as a list of chips
 * // product = {
 * //   id: 456,
 * //   category_ids: [11, 22, 33],
 * // }
 * <ReferenceArrayField label="Categories" reference="categories" source="category_ids">
 *     <SingleFieldList>
 *         <ChipField source="name" />
 *     </SingleFieldList>
 * </ReferenceArrayField>
 *
 */
export declare class UnconnectedReferenceArrayFieldController extends Component<Props> {
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    fetchReferences({ crudGetManyAccumulate, reference, ids }?: Readonly<{
        children?: ReactNode;
    }> & Readonly<Props>): void;
    render(): ReactNode;
}
declare const ReferenceArrayFieldController: import("react-redux").ConnectedComponentClass<typeof UnconnectedReferenceArrayFieldController, Pick<Props, "children" | "source" | "resource" | "basePath" | "reference" | "record"> & Props>;
export default ReferenceArrayFieldController;
