import {
    CREATE_BUDGET,
    INCOME_CHANGED,
    GET_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS,
    GET_INITIAL_BUDGET_STATE,
    EDIT_BUDGET,
    EDIT_BUDGET_SUCCESS,
    EDIT_BUDGET_FAIL,
    GET_BUDGET_ID_SUCCESS,
    GET_BUDGET_ID_FAIL, GET_INITIAL_STATE
} from "../actions/types";

const INITIAL_STATE = {
    budgetID: '',
    income: 0,
    budgetError: '',
    budgetIDError: '',
    budgetLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case GET_INITIAL_BUDGET_STATE:
            return INITIAL_STATE;
        case GET_BUDGET_ID_SUCCESS:
            return {...state, budgetIDError: '', budgetID: action.payload};
        case GET_BUDGET_ID_FAIL:
            return {...state, budgetIDError: action.payload};
        case CREATE_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case CREATE_BUDGET_SUCCESS:
            return {
                ...state,
                budgetLoading: false,
                income: action.payload
            };
        case CREATE_BUDGET_FAIL:
            return {...state, ...INITIAL_STATE, budgetError: action.payload};
        case GET_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case GET_BUDGET_SUCCESS:
            return {
                ...state,
                budgetLoading: false,
                income: action.payload.income
            };
        case GET_BUDGET_FAIL:
            return {...state, budgetError: action.payload};
        case INCOME_CHANGED:
            return {...state, income: action.payload.newIncome};
        case EDIT_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case EDIT_BUDGET_SUCCESS:
            return {
                ...state,
                budgetLoading: false,
                income: action.payload
            };
        case EDIT_BUDGET_FAIL:
            return {...state, budgetError: action.payload};
        default:
            return state;
    }
}
