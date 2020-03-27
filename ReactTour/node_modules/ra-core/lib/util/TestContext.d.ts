import { Component } from 'react';
export declare const defaultStore: {
    admin: {
        resources: {};
        references: {
            possibleValues: {};
        };
        ui: {
            viewVersion: number;
        };
    };
    form: import("redux-form").FormStateMap;
    i18n: {
        locale: string;
        messages: {};
    };
};
interface Props {
    store?: object;
    enableReducers?: boolean;
}
/**
 * Simulate a react-admin context in unit tests
 *
 * Pass custom store values as store prop
 *
 * @example
 * // in an enzyme test
 * const wrapper = render(
 *     <TestContext store={{ admin: { resources: { post: { data: { 1: {id: 1, title: 'foo' } } } } } }}>
 *         <Show {...defaultShowProps} />
 *     </TestContext>
 * );
 *
 * @example
 * // in an enzyme test, using jest.
 * const wrapper = render(
 *     <TestContext store={{ admin: { resources: { post: { data: { 1: {id: 1, title: 'foo' } } } } } }}>
 *         {({ store }) => {
 *              dispatchSpy = jest.spyOn(store, 'dispatch');
 *              return <Show {...defaultShowProps} />
 *         }}
 *     </TestContext>
 * );
 */
declare class TestContext extends Component<Props> {
    storeWithDefault: any;
    constructor(props: any);
    renderChildren: () => any;
    render(): JSX.Element;
}
export default TestContext;
