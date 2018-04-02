import {
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    INCOME_CHANGED,
    GET_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS,
    GET_INITIAL_BUDGET_STATE,
    GET_ACCOUNT_DATA,
    EDIT_BUDGET,
    EDIT_BUDGET_SUCCESS,
    EDIT_BUDGET_FAIL, GET_BUDGET_ID_SUCCESS, GET_BUDGET_ID_FAIL
} from "../actions/types";
import {fromJS} from "immutable";

const INITIAL_STATE = {
    budgetID: 'vNSjX9d8SbjFkFLbWHmP',
    income: 0,
    error: '',
    loading: false,
    isAccountCreated: true,
    totalExpenses: 0,
    disposable: 0,
    debts: [],
    categories: [],
    isBudgetReady: false
};

export default (state = INITIAL_STATE, action) => {
    console.log("Reducer: " + state.budgetID);
    switch (action.type) {
        case GET_INITIAL_BUDGET_STATE:
            return INITIAL_STATE;
        case GET_BUDGET_ID_SUCCESS:
            return {...state, isBudgetReady: true};
        case GET_BUDGET_ID_FAIL:
            return {...state, isBudgetReady: false, error: action.payload};
        case CREATE_BUDGET:
            return {...state, loading: true, error: ''};
        case CREATE_BUDGET_SUCCESS:
            return {
                ...state,
                loading: false,
                income: action.payload.income,
                categories: action.payload.categories,
                totalExpenses: action.payload.totalExpenses,
                disposable: action.payload.disposable
            };
        case CREATE_BUDGET_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case GET_BUDGET:
            return {...state, loading: true, error: ''};
        case GET_BUDGET_SUCCESS:
            return {
                ...state,
                loading: false,
                income: action.payload.income,
                disposable: action.payload.disposable,
                totalExpenses: action.payload.totalExpenses
            };
        case GET_BUDGET_FAIL:
            return {...state, error: action.payload};
        case INCOME_CHANGED:
            let newDisposable = action.payload - state.totalExpenses;
            return {...state, income: action.payload, disposable: newDisposable};
        case CATEGORY_CHANGED:
            // Create list of new categories
            let list = fromJS(state.categories);
            const indexOfListToUpdate = list.findIndex(listItem => {
                return listItem.get('name') === action.payload.name;
            });
            // Calculate new total expenses
            let oldAmount = list.getIn([indexOfListToUpdate, 'amount']);
            let newExpenses = state.totalExpenses - (oldAmount - action.payload.amount);
            // Edit list for the new categories-state
            list = list.setIn([indexOfListToUpdate, 'amount'], action.payload.amount);
            return {...state, categories: list.toJS(), totalExpenses: newExpenses};
        case EDIT_BUDGET:
            return {...state, loading: true, error: ''};
        case EDIT_BUDGET_SUCCESS:
            return {
                ...state,
                loading: false,
                income: action.payload.income,
                categories: action.payload.categories,
                totalExpenses: action.payload.totalExpenses,
                disposable: action.payload.disposable
            };
        case EDIT_BUDGET_FAIL:
            return {...state, error: action.payload};
        case GET_ACCOUNT_DATA:
            return state;
        default:
            return state;
    }
}
