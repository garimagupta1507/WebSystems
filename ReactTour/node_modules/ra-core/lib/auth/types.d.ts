import { AuthActionType } from '../types';
export declare type UserCheck = (payload: object, pathName: string, routeParams?: object) => void;
export declare const AUTH_LOGIN: AuthActionType;
export declare const AUTH_CHECK: AuthActionType;
export declare const AUTH_ERROR: AuthActionType;
export declare const AUTH_LOGOUT: AuthActionType;
export declare const AUTH_GET_PERMISSIONS: AuthActionType;
