import {
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_SCREEN_SWITCHED,
    INCOME_CHANGED,
    GET_INITIAL_STATE, CREATE_BUDGET_FAIL
} from "../actions/types";
import {fromJS, Record} from "immutable";

const INITIAL_STATE = {
    income: '0',
    estimatedIncome: '0',
    error: '',
    loading: false,
    accountCreated: false,
    expenses: '0',
    disposable: '0',
    debt: [
        {name: "Gæld 1", value: '10'},
        {name: "Gæld 2", value: '20'},
        {name: "Gæld 3", value: '30'},
        {name: "Gæld 4", value: '40'}
    ],
    category: [
        {name: "Kategori 1", value: '10'},
        {name: "Kategori 2", value: '20'},
        {name: "Kategori 3", value: '30'},
        {name: "Kategori 4", value: '40'},
        {name: "Kategori 5", value: '50'},
        {name: "Kategori 6", value: '60'},
        {name: "Kategori 7", value: '70'}],
    categoryValue: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return {category: action.payload};
        case INCOME_CHANGED:
            let newDisposable = state.income - state.expenses;
            return {...state, income: action.payload, disposable: newDisposable};
        case CATEGORY_CHANGED:
            let list = fromJS(state.category);
            const indexOfListToUpdate = list.findIndex(listItem => {
                return listItem.get('name') === action.name;
            });
            list = list.setIn([indexOfListToUpdate, 'value'], action.payload);
            return {...state, category: list.toJS()};
        case CREATE_BUDGET:
            return {...state, loading: true, error: ''};
        case CREATE_BUDGET_SCREEN_SWITCHED:
            return INITIAL_STATE;
        case CREATE_BUDGET_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        default:
            return state;
    }
}
