import {
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_SCREEN_SWITCHED,
    INCOME_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
    income: '',
    categoryValue: '',
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
