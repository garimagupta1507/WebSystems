import { Reducer } from 'redux';
interface State {
    isLoggedIn: boolean;
}
declare const authReducer: Reducer<State>;
export declare const isLoggedIn: (state: any) => any;
export default authReducer;
