import expenseReducer from '../../src/app/expenses/expense_reducer';
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
            expenses: [],
            totalExpenses: 0,
            expensesLoading: false,
            expensesError: '',
            expensesInitialized: false
        };
    });

    it('has default state', () => {
        expect(expenseReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });
});