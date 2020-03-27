import { Reducer } from 'redux';
interface State {
    readonly sidebarOpen: boolean;
    readonly optimistic: boolean;
    readonly viewVersion: number;
}
declare const uiReducer: Reducer<State>;
export default uiReducer;
