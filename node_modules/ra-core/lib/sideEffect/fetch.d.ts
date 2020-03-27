import { DataProvider } from '../types';
interface ActionWithSideEffect {
    type: string;
    payload: any;
    meta: {
        fetch: string;
        resource: string;
        onSuccess?: any;
        onFailure?: any;
    };
}
export declare function handleFetch(dataProvider: DataProvider, action: ActionWithSideEffect): IterableIterator<import("redux-saga/effects").AllEffect | import("redux-saga/effects").CallEffect | import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CancelledEffect | import("redux-saga/effects").PutEffect<{
    type: string;
}>>;
export declare const takeFetchAction: (action: any) => any;
declare const fetch: (dataProvider: DataProvider) => () => IterableIterator<import("redux-saga/effects").ForkEffect>;
export default fetch;
