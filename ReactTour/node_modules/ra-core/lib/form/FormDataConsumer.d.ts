import { ReactNode, SFC } from 'react';
interface ChildrenFunctionParams {
    formData: any;
    scopedFormData?: any;
    getSource?: (source: string) => string;
}
interface ConnectedProps {
    children: (params: ChildrenFunctionParams) => ReactNode;
    form?: string;
    record?: any;
    source?: string;
    [key: string]: any;
}
interface Props extends ConnectedProps {
    formData: any;
    index?: number;
}
/**
 * Get the current (edited) value of the record from the form and pass it
 * to child function
 *
 * @example
 *
 * const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <BooleanInput source="hasEmail" />
 *             <FormDataConsumer>
 *                 {({ formData, ...rest }) => formData.hasEmail &&
 *                      <TextInput source="email" {...rest} />
 *                 }
 *             </FormDataConsumer>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example
 *
 * const OrderEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <SelectInput source="country" choices={countries} />
 *             <FormDataConsumer>
 *                 {({ formData, ...rest }) =>
 *                      <SelectInput
 *                          source="city"
 *                          choices={getCitiesFor(formData.country)}
 *                          {...rest}
 *                      />
 *                 }
 *             </FormDataConsumer>
 *         </SimpleForm>
 *     </Edit>
 * );
 */
export declare const FormDataConsumerView: SFC<Props>;
declare const FormDataConsumer: (props: ConnectedProps) => JSX.Element;
export default FormDataConsumer;
