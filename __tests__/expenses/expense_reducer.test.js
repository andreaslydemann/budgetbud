import expenseReducer from '../../src/app/expenses/expense_reducer';
import {GET_EXPENSES_OF_MONTH_FAIL, GET_EXPENSES_OF_MONTH_SUCCESS} from '../../src/strings/types';

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

    it('can handle GET_EXPENSES_OF_MONTH_SUCCESS', () => {
        const expenses = 123;
        const totalExpenses = 456;
        let newState = initialState;
        const GetEOMSuccessAction = {
            type: GET_EXPENSES_OF_MONTH_SUCCESS,
            payload: {expenses, totalExpenses}
        };
        newState = expenseReducer(newState, GetEOMSuccessAction);
        expect(newState.expenses).toEqual(expenses)
        expect(newState.totalExpenses).toEqual(totalExpenses)
    });

    it('can handle GET_EXPENSES_OF_MONTH_FAIL', () => {
        const testError = "ERROR";
        let newState = initialState;
        const GetEOMFailAction = {
            type: GET_EXPENSES_OF_MONTH_FAIL,
            payload: testError
        };
        newState = expenseReducer(newState, GetEOMFailAction);
        expect(newState.expensesLoading).toEqual(false);
        expect(newState.expensesError).toEqual(testError);
    });
});