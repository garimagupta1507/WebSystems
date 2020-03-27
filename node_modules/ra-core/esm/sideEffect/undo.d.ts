export declare function handleUndoRace(undoableAction: {
    payload: {
        action: any;
    };
}): IterableIterator<import("redux-saga/effects").PutEffect<any> | import("redux-saga/effects").RaceEffect>;
export default function watchUndoable(): IterableIterator<any>;
