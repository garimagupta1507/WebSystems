import { ComponentType, SFC } from 'react';
import { Validator } from './validate';
import { InputProps } from './types';
export declare const isRequired: (validate: any) => boolean;
interface Props {
    component: ComponentType<InputProps>;
    defaultValue: any;
    input?: any;
    source: string;
    validate: Validator | Validator[];
}
export declare const FormFieldView: SFC<Props>;
declare const FormField: import("react-redux").ConnectedComponentClass<typeof import("./withDefaultValue").DefaultValueView, Pick<import("./withDefaultValue").DefaultValueProps, "input" | "source" | "defaultValue">>;
export default FormField;
