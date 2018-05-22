import disposableReducer from '../../src/app/disposable/disposable_reducer';
import {
    DEBT_AMOUNT_CHANGED,
    DEBT_SELECTED,
    GET_DEBTS_SUCCESS,
    DELETE_DEBT
} from '../../src/strings/types';
import * as datetime from "lodash/date";

describe('debt_reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            disposable: 0,
            disposableLoading: false,
            disposableError: '',
            disposableCalculationLoading: false,
            disposableCategorySubtractions: []
        };
    });

    it('has default state', () => {
        expect(disposableReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });
});