import budgetReducer from '../../src/app/budgets/budget_reducer';
import {
    CREATE_BUDGET_FAIL,
    CREATE_BUDGET_SUCCESS,
    DELETE_BUDGET,
    EDIT_BUDGET_SUCCESS,
    GET_BUDGET_ID_SUCCESS,
} from '../../src/strings/types';

describe('budget_reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            budgetID: '',
            income: 0,
            budgetError: '',
            budgetIDError: '',
            budgetLoading: false,
            budgetInitialized: false
        };
    });

    it('has default state', () => {
        expect(budgetReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });

    it('can handle CREATE_BUDGET_SUCCESS', () => {
        const budgetID = '1234';
        const income = 20;
        const createBudgetSuccessAction = {
            type: CREATE_BUDGET_SUCCESS,
            payload: {budgetID, income}
        };
        expect(budgetReducer({}, createBudgetSuccessAction)).toEqual({
            budgetLoading: false,
            budgetInitialized: true,
            income,
            budgetID
        })
    });

    it('can handle GET_BUDGET_ID_SUCCESS', () => {
        const budgetID = 1234;
        const getBudgetIDSuccessAction = {
            type: GET_BUDGET_ID_SUCCESS,
            payload: budgetID
        };
        expect(budgetReducer({}, getBudgetIDSuccessAction)).toEqual({
                budgetIDError: '',
                budgetID
            }
        )
    });

    it('can handle EDIT_BUDGET_SUCCESS', () => {
        const income = 20;
        const editBudgetSuccessAction = {
            type: EDIT_BUDGET_SUCCESS,
            payload: {income}
        };
        expect(budgetReducer({}, editBudgetSuccessAction)).toEqual({
                budgetLoading: false,
                income
            }
        )
    });

    it('can handle DELETE_BUDGET', () => {
        const deleteBudgetAction = {
            type: DELETE_BUDGET
        };
        expect(budgetReducer({}, deleteBudgetAction)).toEqual(
            {budgetLoading: true, budgetError: ''}
        )
    });

    it('can handle CREATE_BUDGET_FAIL', () => {
        const budgetError = 'testError';
        const createBudgetFailAction = {
            type: CREATE_BUDGET_FAIL,
            payload: budgetError
        };
        expect(budgetReducer({}, createBudgetFailAction)).toEqual(
            {budgetLoading: false, budgetError}
        )
    });
});