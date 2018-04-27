import categoryReducer from '../../src/app/categories/category_reducer';
import {
    RESET_DEBT_FORM,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_OF_DEBT,
    GET_CATEGORIES_OF_DEBT_SUCCESS,
    GET_CATEGORIES_OF_DEBT_FAIL,
    CATEGORIES_SELECTED,
    CREATE_CATEGORIES,
    CREATE_CATEGORIES_SUCCESS,
    CREATE_CATEGORIES_FAIL,
    SETUP_EDIT_BUDGET,
    SETUP_EDIT_BUDGET_SUCCESS,
    SETUP_EDIT_BUDGET_FAIL,
    MAP_EXPENSES,
    MAP_EXPENSES_SUCCESS,
    MAP_EXPENSES_FAIL,
    CATEGORY_CHANGED,
    GET_BUDGET_SUCCESS,
    GET_INITIAL_STATE,
    EDIT_CATEGORIES,
    EDIT_CATEGORIES_SUCCESS,
    EDIT_CATEGORIES_FAIL,
    EDIT_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS
} from '../../src/strings/types';

describe('category_reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            categories: [],
            categoriesOfDebt: [],
            selectedCategories: [],
            categorySubtractions: [],
            categoriesLoading: false,
            subtractionsLoading: false,
            categoriesError: '',
            tmpCategories: [],
            totalGoalsAmount: 0,
            categoriesInitialized: false
        };
    });

    it('has default state', () => {
        expect(categoryReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });

    it('can handle CREATE_BUDGET_SUCCESS', () => {
        const budgetID = '1234';
        const income = 20;
        const createBudgetSuccessAction = {
            type: CREATE_BUDGET_SUCCESS,
            payload: {budgetID, income}
        };
        expect(categoryReducer({}, createBudgetSuccessAction)).toEqual({
            budgetLoading: false,
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
        expect(categoryReducer({}, getBudgetIDSuccessAction)).toEqual({
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
        expect(categoryReducer({}, editBudgetSuccessAction)).toEqual({
                budgetLoading: false,
                income
            }
        )
    });

    it('can handle DELETE_BUDGET', () => {
        const deleteBudgetAction = {
            type: DELETE_BUDGET
        };
        expect(categoryReducer({}, deleteBudgetAction)).toEqual(
            {budgetLoading: true, budgetError: ''}
        )
    });

    it('can handle CREATE_BUDGET_FAIL', () => {
        const budgetError = 'testError';
        const createBudgetFailAction = {
            type: CREATE_BUDGET_FAIL,
            payload: budgetError
        };
        expect(categoryReducer({}, createBudgetFailAction)).toEqual(
            {budgetLoading: false, budgetError}
        )
    });
});