import {
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    INCOME_CHANGED,
    GET_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS, GET_INITIAL_BUDGET_STATE
} from "../actions/types";
import {fromJS} from "immutable";

const INITIAL_STATE = {
    budgetID: '',
    income: '0',
    estimatedIncome: '0',
    error: '',
    loading: false,
    accountCreated: false,
    totalExpenses: '0',
    disposable: '0',
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
            return {...state,
                isBudgetCreated: true,
                loading: false,
                income: action.income,
                categories: action.categories,
                budgetID: action.budgetID};
        case GET_BUDGET_FAIL:
            return {...state, error: action.payload};
        case CREATE_BUDGET:
            return {...state, loading: true, error: ''};
        case CREATE_BUDGET_SUCCESS:
            return {...state,
                loading: false,
                income: action.income,
                categories: action.categories,
                totalExpenses: action.totalExpenses,
                disposable: action.disposable};
        case CREATE_BUDGET_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case INCOME_CHANGED:
            let newDisposable = state.income - state.totalExpenses;
            return {...state, income: action.payload, disposable: newDisposable};
        case CATEGORY_CHANGED:
            let list = fromJS(state.categories);
            const indexOfListToUpdate = list.findIndex(listItem => {
                return listItem.get('name') === action.name;
            });
            list = list.setIn([indexOfListToUpdate, 'amount'], action.amount);
            return {...state, categories: list.toJS()};
        default:
            return state;
    }
}
