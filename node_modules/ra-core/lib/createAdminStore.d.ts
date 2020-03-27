import { History } from 'history';
import { AuthProvider, DataProvider, I18nProvider } from './types';
interface Params {
    dataProvider: DataProvider;
    history: History;
    authProvider?: AuthProvider;
    customReducers?: any;
    customSagas?: any[];
    i18nProvider?: I18nProvider;
    initialState?: object;
    locale?: string;
}
declare const _default: ({ dataProvider, history, customReducers, authProvider, customSagas, i18nProvider, initialState, locale, }: Params) => import("redux").Store<any>;
export default _default;
