import { Reducer } from 'redux';
interface State {
    sort: string;
    order: string;
    page: number;
    perPage: number;
    filter: any;
}
declare const paramsReducer: Reducer<State>;
export default paramsReducer;
