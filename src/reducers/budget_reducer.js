import {
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_SCREEN_SWITCHED,
    INCOME_CHANGED, LOAD_INITIAL
} from "../actions/types";

const INITIAL_STATE = {
    income: '',
    category: ['', ''],
    error: '',
    loading: false,
    data: [
        {name: "Kategori 1", categoryValue: '10'},
        {name: "Kategori 2", categoryValue: '20'},
        {name: "Kategori 3", categoryValue: '30'},
        {name: "Kategori 4", categoryValue: '40'},
        {name: "Kategori 5", categoryValue: '50'},
        {name: "Kategori 6", categoryValue: '60'},
        {name: "Kategori 7", categoryValue: '70'}
    ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_INITIAL:
            return {...state.data, categoryValue: action.payload};
        case INCOME_CHANGED:
            return {...state, income: action.payload};
        case CATEGORY_CHANGED:
            return {...state, data: {...state.name, categoryValue: action.payload}};
        case CREATE_BUDGET:
            return {...state, loading: true, error: ''};
        case CREATE_BUDGET_SCREEN_SWITCHED:
            return INITIAL_STATE;
        default:
            return state;
    }
}
