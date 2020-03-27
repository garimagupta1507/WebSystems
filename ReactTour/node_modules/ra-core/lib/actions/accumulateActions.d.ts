/// <reference types="react" />
import { Pagination, Sort, Identifier } from '../types';
export declare const CRUD_GET_MANY_ACCUMULATE = "RA/CRUD_GET_MANY_ACCUMULATE";
export interface CrudGetManyAccumulateAction {
    readonly type: typeof CRUD_GET_MANY_ACCUMULATE;
    readonly payload: {
        resource: string;
        ids: Identifier[];
    };
    readonly meta: {
        accumulate: any;
    };
}
export declare const crudGetManyAccumulate: (resource: string, ids: import("react").ReactText[]) => CrudGetManyAccumulateAction;
export declare const CRUD_GET_MATCHING_ACCUMULATE = "RA/CRUD_GET_MATCHING_ACCUMULATE";
export interface CrudGetMatchingAccumulateAction {
    readonly type: typeof CRUD_GET_MATCHING_ACCUMULATE;
    readonly meta: {
        accumulate: () => any;
        accumulateValues?: () => boolean;
        accumulateKey?: string;
    };
}
export declare const crudGetMatchingAccumulate: (reference: string, relatedTo: string, pagination: Pagination, sort: Sort, filter: object) => CrudGetMatchingAccumulateAction;
