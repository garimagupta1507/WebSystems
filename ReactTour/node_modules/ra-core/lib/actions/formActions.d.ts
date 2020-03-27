export declare const INITIALIZE_FORM = "RA/INITIALIZE_FORM";
export interface InitializeFormAction {
    readonly type: typeof INITIALIZE_FORM;
    readonly payload: any;
}
export declare const initializeForm: (initialValues: any) => InitializeFormAction;
export declare const RESET_FORM = "RA/RESET_FORM";
export interface ResetFormAction {
    readonly type: typeof RESET_FORM;
}
export declare const resetForm: () => ResetFormAction;
export declare const BEFORE_LOCATION_CHANGE = "RA/BEFORE_LOCATION_CHANGE";
export interface BeforeLocationChangeAction {
    readonly type: typeof BEFORE_LOCATION_CHANGE;
    readonly payload: any;
    readonly meta: any;
}
export declare const beforeLocationChange: ({ payload, meta, }: {
    payload: any;
    meta: any;
}) => BeforeLocationChangeAction;
