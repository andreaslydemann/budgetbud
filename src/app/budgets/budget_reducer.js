import {
    GET_INITIAL_STATE,
    GET_INITIAL_BUDGET_STATE,
    CREATE_BUDGET,
    INCOME_CHANGED,
    GET_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    DELETE_BUDGET_FAIL,
    CREATE_BUDGET_SUCCESS,
    EDIT_BUDGET,
    EDIT_BUDGET_SUCCESS,
    EDIT_BUDGET_FAIL,
    GET_BUDGET_ID_SUCCESS,
    GET_BUDGET_ID_FAIL,
    RESET_BUDGET_ERROR, DELETE_BUDGET
} from "../../strings/types";

const INITIAL_STATE = {
    budgetID: '',
    income: 0,
    budgetError: '',
    budgetIDError: '',
    budgetLoading: false,
    budgetInitialized: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case GET_INITIAL_BUDGET_STATE:
            return INITIAL_STATE;
        case RESET_BUDGET_ERROR:
            return {...state, budgetError: ''};
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
                income: action.payload.income,
                budgetID: action.payload.budgetID,
                budgetInitialized: true
            };
        case CREATE_BUDGET_FAIL:
            return {...state, budgetLoading: false, budgetError: action.payload};
        case GET_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case GET_BUDGET_SUCCESS:
            return {
                ...state,
                budgetLoading: false,
                income: action.payload.income,
                budgetInitialized: true
            };
        case DELETE_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case DELETE_BUDGET_FAIL:
            return {...state, budgetLoading: false, budgetError: action.payload};
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
                income: action.payload.income
            };
        case EDIT_BUDGET_FAIL:
            return {...state, budgetError: action.payload, budgetLoading: false};
        default:
            return state;
    }
}
