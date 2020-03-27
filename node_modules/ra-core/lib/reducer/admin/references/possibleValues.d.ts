import { Reducer } from 'redux';
import { Identifier } from '../../../types';
interface State {
    [relatedTo: string]: {
        error?: string | object;
    } | Identifier[];
}
declare const possibleValuesreducer: Reducer<State>;
export declare const getPossibleReferenceValues: (state: any, props: any) => any;
export declare const getPossibleReferences: (referenceState: any, possibleValues: any, selectedIds?: any[]) => any;
export default possibleValuesreducer;
