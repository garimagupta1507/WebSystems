import React from 'react';
import { TranslationContextProps } from './TranslationContext';
/**
 * Higher-Order Component for getting access to the `translate` function in props.
 *
 * Requires that the app is decorated by the <TranslationProvider> to inject
 * the translation dictionaries and function in the context.
 *
 * @example
 *     import React from 'react';
 *     import { translate } from 'react-admin';
 *
 *     const MyHelloButton = ({ translate }) => (
 *         <button>{translate('myroot.hello.world')}</button>
 *     );
 *
 *     export default translate(MyHelloButton);
 *
 * @param {*} BaseComponent The component to decorate
 */
declare const withTranslate: <OriginalProps extends TranslationContextProps>(BaseComponent: React.ComponentType<OriginalProps>) => React.ComponentClass<OriginalProps, any>;
export default withTranslate;
