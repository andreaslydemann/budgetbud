import {
    GET_INITIAL_STATE,
    GET_EXPENSES_OF_MONTH,
    GET_EXPENSES_OF_MONTH_SUCCESS,
    GET_EXPENSES_OF_MONTH_FAIL
} from "../../strings/types";

const INITIAL_STATE = {
    expenses: [],
    totalExpenses: 0,
    expensesLoading: false,
    expensesFail: '',
    expensesInitialized: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case GET_EXPENSES_OF_MONTH:
            return {...state, expensesFail: '', expensesLoading: true};
        case GET_EXPENSES_OF_MONTH_SUCCESS:
            return {
                ...state,
                expenses: action.payload.expenses,
                totalExpenses: action.payload.totalExpenses,
                expensesLoading: false,
                expensesInitialized: true
            };
        case GET_EXPENSES_OF_MONTH_FAIL:
            return {...state, expensesLoading: false, expensesFail: action.payload};
        default:
            return state;
    }
};
