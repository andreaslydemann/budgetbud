import disposableReducer from '../../src/app/disposable/disposable_reducer';
import {
    DEBT_AMOUNT_CHANGED,
    DEBT_SELECTED,
    GET_DEBTS_SUCCESS,
    DELETE_DEBT, EDIT_DISPOSABLE_SUCCESS, CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS
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

    it('can handle CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS', () => {
        const testDisposableCategorySubtractions = 123;
        let newState = initialState;
        const calculateDisposableAction = {
            type: CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS,
            payload: testDisposableCategorySubtractions
        };
        newState = disposableReducer(newState, calculateDisposableAction);
        expect(newState.disposableCategorySubtractions).toEqual(testDisposableCategorySubtractions)
    });

    it('can handle EDIT_DISPOSABLE_SUCCESS', () => {
        const tmpDisposable = 123;
        let newState = initialState;
        const editDisposableaction = {
            type: EDIT_DISPOSABLE_SUCCESS,
            payload: tmpDisposable
        };
        newState = disposableReducer(newState, editDisposableaction);
        expect(newState.disposable).toEqual(tmpDisposable)
    });
});