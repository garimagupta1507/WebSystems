/// <reference types="react" />
import { Translate } from '../types';
export interface TranslationContextProps {
    locale: string;
    translate: Translate;
}
export declare const TranslationContext: import("react").Context<TranslationContextProps>;
