import {
    GET_INITIAL_BUDGET_STATE,
    GET_BUDGET_ID_SUCCESS,
    GET_BUDGET_ID_FAIL
} from "../actions/types";

const INITIAL_STATE = {
    budgetID: '',
    isBudgetReady: false
};

export default (state = INITIAL_STATE, action) => {
    console.log("Reducer hit");
    switch (action.type) {
        case GET_INITIAL_BUDGET_STATE:
            return INITIAL_STATE;
        case GET_BUDGET_ID_SUCCESS:
            console.log("SUCCESS");
            return {...state, isBudgetReady: true};
        case GET_BUDGET_ID_FAIL:
            console.log("FAIL");
            return {...state, isBudgetReady: false, error: action.payload};
        default:
            return state;
    }
}
