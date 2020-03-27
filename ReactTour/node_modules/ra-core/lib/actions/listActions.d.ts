export declare const CRUD_CHANGE_LIST_PARAMS = "RA/CRUD_CHANGE_LIST_PARAMS";
export interface ListParams {
    sort: string;
    order: string;
    page: number;
    perPage: number;
    filter: any;
}
export interface ChangeListParamsAction {
    readonly type: typeof CRUD_CHANGE_LIST_PARAMS;
    readonly payload: ListParams;
    readonly meta: {
        resource: string;
    };
}
export declare const changeListParams: (resource: string, params: ListParams) => ChangeListParamsAction;
export declare const SET_LIST_SELECTED_IDS = "RA/SET_LIST_SELECTED_IDS";
export interface SetListSelectedIdsAction {
    readonly type: typeof SET_LIST_SELECTED_IDS;
    readonly payload: [];
    readonly meta: {
        resource: string;
    };
}
export declare const setListSelectedIds: (resource: string, ids: []) => SetListSelectedIdsAction;
export declare const TOGGLE_LIST_ITEM = "RA/TOGGLE_LIST_ITEM";
export interface ToggleListItemAction {
    readonly type: typeof TOGGLE_LIST_ITEM;
    readonly payload: any;
    readonly meta: {
        resource: string;
    };
}
export declare const toggleListItem: (resource: string, id: any) => ToggleListItemAction;
