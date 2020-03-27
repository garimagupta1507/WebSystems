export declare const finalizeFactory: (tasks: any, accumulations: any) => (key: any, actionCreator: any) => IterableIterator<import("redux-saga/effects").PutEffect<any> | import("redux-saga/effects").CallEffect>;
export declare const accumulateFactory: (tasks: any, accumulations: any, finalize: any) => (action: any) => IterableIterator<import("redux-saga/effects").ForkEffect | import("redux-saga/effects").CancelEffect>;
export default function (): IterableIterator<import("redux-saga/effects").ForkEffect>;
