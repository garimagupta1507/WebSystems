import { Reducer } from 'redux';
import { Notification } from '../../actions/notificationActions';
declare type State = Notification[];
declare const notificationsReducer: Reducer<State>;
export default notificationsReducer;
/**
 * Returns the first available notification to show
 * @param {Object} state - Redux state
 */
export declare const getNotification: (state: any) => any;
