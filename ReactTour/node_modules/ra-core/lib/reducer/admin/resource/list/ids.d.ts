import { Reducer } from 'redux';
import { Identifier } from '../../../../types';
declare type IdentifierArray = Identifier[];
export interface IdentifierArrayWithDate extends IdentifierArray {
    fetchedAt?: Date;
}
declare type State = IdentifierArrayWithDate;
export declare const addRecordIdsFactory: (getFetchedAtCallback: any) => (newRecordIds: IdentifierArrayWithDate, oldRecordIds: IdentifierArrayWithDate) => IdentifierArrayWithDate;
declare const idsReducer: Reducer<State>;
export default idsReducer;
export declare const getIds: (state: any) => any;
