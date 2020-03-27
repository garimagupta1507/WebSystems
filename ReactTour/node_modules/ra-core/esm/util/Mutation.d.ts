import { ReactNode } from 'react';
interface ChildrenFuncParams {
    data?: any;
    loading: boolean;
    error?: any;
}
interface RawProps {
    children: (mutate: () => void, params: ChildrenFuncParams) => ReactNode;
    type: string;
    resource: string;
    payload?: any;
    options?: any;
}
declare const _default: import("react-redux").ConnectedComponentClass<any, Pick<{}, never> & RawProps>;
export default _default;
