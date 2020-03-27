/// <reference types="react" />
import { InferredType } from './types';
declare class InferredElement {
    private type?;
    private props?;
    private children?;
    constructor(type?: InferredType, props?: any, children?: any);
    getElement(props?: {}): import("react").ReactElement<{}>;
    getProps(): any;
    isDefined(): boolean;
    getRepresentation(): string;
}
export default InferredElement;
