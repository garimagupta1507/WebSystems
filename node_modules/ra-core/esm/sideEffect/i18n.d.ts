import { I18nProvider } from '../types';
declare const _default: (i18nProvider: I18nProvider) => () => IterableIterator<import("redux-saga/effects").AllEffect>;
/**
 * The i18n side effect reacts to the CHANGE_LOCALE actions, calls
 * the i18nProvider (which may be asynchronous) with the requested locale,
 * and dispatches changeLocaleSuccess or changeLocaleFailure with the result.
 */
export default _default;
