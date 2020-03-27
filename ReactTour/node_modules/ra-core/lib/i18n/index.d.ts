/// <reference types="react" />
import defaultI18nProvider from './defaultI18nProvider';
import translate from './translate';
import TranslationProvider from './TranslationProvider';
declare const withTranslate: <OriginalProps extends import("./TranslationContext").TranslationContextProps>(BaseComponent: import("react").ComponentType<OriginalProps>) => import("react").ComponentClass<OriginalProps, any>;
export { defaultI18nProvider, translate, withTranslate, TranslationProvider };
export declare const DEFAULT_LOCALE = "en";
export * from './TranslationUtils';
export * from './TranslationContext';
