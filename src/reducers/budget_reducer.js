import {
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    INCOME_CHANGED,
    GET_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS, GET_INITIAL_BUDGET_STATE, GET_ACCOUNT_DATA
} from "../actions/types";
import {fromJS} from "immutable";

const INITIAL_STATE = {
    budgetID: '',
    income: 0,
    error: '',
    loading: false,
    isAccountCreated: true,
    totalExpenses: 0,
    disposable: 0,
    debt: [],
    categories: [],
    isBudgetCreated: false,
    isDebtLoaded: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_BUDGET_STATE:
            return INITIAL_STATE;
        case GET_BUDGET:
            return {...state, loading: true, error: ''};
        case GET_BUDGET_SUCCESS:
            return {
                ...state,
                isBudgetCreated: true,
                loading: false,
                income: action.budget.budgetData.income,
                categories: action.categories,
                budgetID: action.budget.id,
                disposable: action.budget.budgetData.disposable,
                totalExpenses: action.budget.budgetData.totalExpenses
            };
        case GET_BUDGET_FAIL:
            return {...state, error: action.payload};
        case CREATE_BUDGET:
            return {...state, loading: true, error: ''};
        case CREATE_BUDGET_SUCCESS:
            return {
                ...state,
                loading: false,
                income: action.income,
                categories: action.categories,
                totalExpenses: action.totalExpenses,
                disposable: action.disposable
            };
        case CREATE_BUDGET_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case INCOME_CHANGED:
            let newDisposable = action.payload - state.totalExpenses;
            return {...state, income: action.payload, disposable: newDisposable};
        case CATEGORY_CHANGED:
            // Create list of new categories
            let list = fromJS(state.categories);
            const indexOfListToUpdate = list.findIndex(listItem => {
                return listItem.get('name') === action.name;
            });
            // Calculate new total expenses
            let oldAmount = list.getIn([indexOfListToUpdate, 'amount']);
            let newExpenses = state.totalExpenses - (oldAmount - action.amount);
            // Edit list for the new categories-state
            list = list.setIn([indexOfListToUpdate, 'amount'], action.amount);
            return {...state, categories: list.toJS(), totalExpenses: newExpenses};
        case GET_ACCOUNT_DATA:
            return {...state, ...INITIAL_STATE};
        default:
            return state;
    }
}
