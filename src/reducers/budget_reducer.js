import {
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_SCREEN_SWITCHED,
    INCOME_CHANGED,
    GET_INITIAL_STATE
} from "../actions/types";

const INITIAL_STATE = {
    income: '',
    estimatedIncome: '0',
    error: '',
    loading: false,
    accountCreated: true,
    expenses: '0',
    disposable: '0',
    category: [
        {name: "Kategori 1", value: '10'},
        {name: "Kategori 2", value: '20'},
        {name: "Kategori 3", value: '30'},
        {name: "Kategori 4", value: '40'},
        {name: "Kategori 5", value: '50'},
        {name: "Kategori 6", value: '60'},
        {name: "Kategori 7", value: '70'}
    ],
    debt: [
        {name: "Gæld 1", value: '10'},
        {name: "Gæld 2", value: '20'},
        {name: "Gæld 3", value: '30'},
        {name: "Gæld 4", value: '40'}
    ],
    categoryValue: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return {...state, category: action.payload};
        case INCOME_CHANGED:
            return {...state, income: action.payload};
        case CATEGORY_CHANGED:
            return {...state, categoryValue: action.payload};
        case CREATE_BUDGET:
            return {...state, loading: true, error: ''};
        case CREATE_BUDGET_SCREEN_SWITCHED:
            return INITIAL_STATE;
        default:
            return state;
    }
}
