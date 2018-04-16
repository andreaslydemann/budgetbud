
import {
    MAP_EXPENSES_TO_EXPENSE_OVERVIEW, MAP_EXPENSES_TO_EXPENSE_OVERVIEW_FAIL,
    MAP_EXPENSES_TO_EXPENSE_OVERVIEW_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    expenses: [],
    expensesLoading: false,
    expensesFail: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MAP_EXPENSES_TO_EXPENSE_OVERVIEW:
            return {...state, expensesFail: '', expensesLoading: true};
        case MAP_EXPENSES_TO_EXPENSE_OVERVIEW_SUCCESS:
            return {...state, expenses: action.payload, expensesLoading: false};
        case MAP_EXPENSES_TO_EXPENSE_OVERVIEW_FAIL:
            return {...state, expensesLoading: false, expensesFail: action.payload};
        default:
            return state;
    }
};
