import {
    GET_BUDGET_ID_SUCCESS,
    DELETE_BUDGET, GET_BUDGET_ID_FAIL
} from '../../strings/types';

const INITIAL_STATE = {
    initialRoute: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BUDGET_ID_SUCCESS:
            return {initialRoute: 'BudgetStack'};
        case GET_BUDGET_ID_FAIL:
        return {initialRoute: 'IntroStack'};
        case DELETE_BUDGET:
            return {initialRoute: 'IntroStack'};
        default:
            return state;
    }
};
