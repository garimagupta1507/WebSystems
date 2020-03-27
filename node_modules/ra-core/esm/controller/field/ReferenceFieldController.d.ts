import { Component, ReactNode } from 'react';
import { crudGetManyAccumulate as crudGetManyAccumulateAction } from '../../actions';
import { Record, Dispatch } from '../../types';
interface ChildrenFuncParams {
    isLoading: boolean;
    referenceRecord: Record;
    resourceLinkPath: string | boolean;
}
interface Props {
    allowEmpty?: boolean;
    basePath: string;
    children: (params: ChildrenFuncParams) => ReactNode;
    crudGetManyAccumulate: Dispatch<typeof crudGetManyAccumulateAction>;
    record?: Record;
    reference: string;
    referenceRecord?: Record;
    resource: string;
    source: string;
    linkType: string | boolean;
}
/**
 * Fetch reference record, and delegate rendering to child component.
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * By default, includes a link to the <Edit> page of the related record
 * (`/users/:userId` in the previous example).
 *
 * Set the linkType prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType="show">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * You can also prevent `<ReferenceField>` from adding link to children by setting
 * `linkType` to false.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType={false}>
 *     <TextField source="name" />
 * </ReferenceField>
 */
export declare class UnconnectedReferenceFieldController extends Component<Props> {
    static defaultProps: Partial<Props>;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    fetchReference(props: any): void;
    render(): ReactNode;
}
declare const ReferenceFieldController: import("react-redux").ConnectedComponentClass<typeof UnconnectedReferenceFieldController, any>;
export default ReferenceFieldController;
