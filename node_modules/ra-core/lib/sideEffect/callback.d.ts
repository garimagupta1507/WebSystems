export declare type CallbackSideEffect = (args: {
    payload: any;
    requestPayload?: any;
    error?: string | {
        message: string;
    };
}) => any;
export default function (): IterableIterator<import("redux-saga/effects").ForkEffect>;
