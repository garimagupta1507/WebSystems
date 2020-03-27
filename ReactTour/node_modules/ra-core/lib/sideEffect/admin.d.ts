import { DataProvider, AuthProvider, I18nProvider } from '../types';
declare const _default: (dataProvider: DataProvider, authProvider: AuthProvider, i18nProvider: I18nProvider) => () => IterableIterator<import("redux-saga/effects").GenericAllEffect<any>>;
/**
 * @param {Object} dataProvider A Data Provider function
 */
export default _default;
