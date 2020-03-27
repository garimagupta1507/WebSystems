import React, { Component } from 'react';
import { registerResource as registerResourceAction, unregisterResource as unregisterResourceAction } from './actions';
import { Dispatch, ResourceProps } from './types';
interface ConnectedProps {
    registerResource: Dispatch<typeof registerResourceAction>;
    unregisterResource: Dispatch<typeof unregisterResourceAction>;
}
export declare class Resource extends Component<ResourceProps & ConnectedProps> {
    static defaultProps: {
        context: string;
        options: {};
    };
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentType<ResourceProps>;
export default _default;
