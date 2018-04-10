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
    EDIT_BUDGET_FAIL,
    GET_BUDGET_ID_SUCCESS,
    GET_BUDGET_ID_FAIL
} from "../actions/types";
import {fromJS} from "immutable";

const INITIAL_STATE = {
    budgetID: '',
    income: 0,
    budgetError: '',
    budgetLoading: false,
    totalExpenses: 0,
    disposable: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_BUDGET_STATE:
            return INITIAL_STATE;
        case GET_BUDGET_ID_SUCCESS:
            return {...state, budgetID: action.payload};
        case GET_BUDGET_ID_FAIL:
            return {...state, budgetError: action.payload};
        case CREATE_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case CREATE_BUDGET_SUCCESS:
            return {
                ...state,
                budgetLoading: false,
                income: action.payload.income,
                totalExpenses: action.payload.totalExpenses,
                disposable: action.payload.disposable
            };
        case CREATE_BUDGET_FAIL:
            return {...state, ...INITIAL_STATE, budgetError: action.payload};
        case GET_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case GET_BUDGET_SUCCESS:
            console.log("Success");
            console.log(action.payload);
            return {
                ...state,
                budgetLoading: false,
                income: action.payload.income,
                disposable: action.payload.disposable,
                totalExpenses: action.payload.totalExpenses
            };
        case GET_BUDGET_FAIL:
            return {...state, budgetError: action.payload};
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
            return {...state, budgetLoading: true, budgetError: ''};
        case EDIT_BUDGET_SUCCESS:
            return {
                ...state,
                budgetLoading: false,
                income: action.payload.income,
                totalExpenses: action.payload.totalExpenses,
                disposable: action.payload.disposable
            };
        case EDIT_BUDGET_FAIL:
            return {...state, budgetError: action.payload};
        case GET_ACCOUNT_DATA:
            return state;
        default:
            return state;
    }
}
