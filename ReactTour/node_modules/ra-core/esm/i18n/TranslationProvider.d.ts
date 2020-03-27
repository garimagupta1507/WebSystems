import { ReactElement, Component } from 'react';
import { TranslationContextProps } from './TranslationContext';
interface MappedProps {
    locale: string;
    messages: object;
}
interface State {
    contextValues: TranslationContextProps;
}
interface Props {
    children: ReactElement<any>;
}
interface ViewProps extends MappedProps, Props {
}
/**
 * Creates a translation context, available to its children
 *
 * Must be called within a Redux app.
 *
 * @example
 *     const MyApp = () => (
 *         <Provider store={store}>
 *             <TranslationProvider locale="fr" messages={messages}>
 *                 <!-- Child components go here -->
 *             </TranslationProvider>
 *         </Provider>
 *     );
 */
declare class TranslationProviderView extends Component<ViewProps, State> {
    constructor(props: any);
    componentDidUpdate(prevProps: any): void;
    render(): JSX.Element;
}
declare const TranslationProvider: import("react-redux").ConnectedComponentClass<typeof TranslationProviderView, any>;
export default TranslationProvider;
