import {
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    INCOME_CHANGED,
    GET_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS
} from "../actions/types";
import {fromJS} from "immutable";

const INITIAL_STATE = {
    budgetID: '',
    income: '0',
    estimatedIncome: '0',
    error: '',
    loading: false,
    accountCreated: false,
    expenses: '0',
    disposable: '0',
    debt: [],
    categories: [
        {name: "Kategori 1", amount: '10'},
        {name: "Kategori 2", amount: '20'},
        {name: "Kategori 3", amount: '30'},
        {name: "Kategori 4", amount: '40'},
        {name: "Kategori 5", amount: '50'},
        {name: "Kategori 6", amount: '60'},
        {name: "Kategori 7", amount: '70'}
        ],
    isBudgetCreated: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BUDGET:
            return {...state, loading: true, error: ''};
        case GET_BUDGET_SUCCESS:
            return {...state, isBudgetCreated: true, income: action.income, categories: action.categories, budgetID: action.budgetID};
        case GET_BUDGET_FAIL:
            return {...state, error: action.payload};
        case CREATE_BUDGET:
            return {...state, loading: true, error: ''};
        case CREATE_BUDGET_SUCCESS:
            return {...state, loading: false, income: action.income, categories: action.categories};
        case CREATE_BUDGET_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case INCOME_CHANGED:
            let newDisposable = state.income - state.expenses;
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
