import { ReactNode } from 'react';
interface ChildrenFuncParams {
    data?: any;
    total?: number;
    loading: boolean;
    error?: any;
}
interface RawProps {
    children: (params: ChildrenFuncParams) => ReactNode;
    type: string;
    resource: string;
    payload?: any;
    options?: any;
}
declare const _default: import("react-redux").ConnectedComponentClass<any, Pick<{}, never> & RawProps>;
export default _default;
