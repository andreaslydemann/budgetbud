import {
    GET_EXPENSES_OF_MONTH,
    GET_EXPENSES_OF_MONTH_SUCCESS,
    GET_EXPENSES_OF_MONTH_FAIL, GET_INITIAL_STATE
} from "../actions/types";

const INITIAL_STATE = {
    expenses: [],
    totalExpenses: 0,
    expensesLoading: false,
    expensesFail: ''
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
                expensesLoading: false
            };
        case GET_EXPENSES_OF_MONTH_FAIL:
            return {...state, expensesLoading: false, expensesFail: action.payload};
        default:
            return state;
    }
};
