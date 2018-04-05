import {
    GET_BUDGET_ID_SUCCESS,
    CREATE_BUDGET_SUCCESS,
    DELETE_BUDGET
} from '../actions/types';

const INITIAL_STATE = {
    initialRoute: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BUDGET_ID_SUCCESS:
            return {initialRoute: 'BudgetStack'};
        case CREATE_BUDGET_SUCCESS:
            return {initialRoute: 'BudgetStack'};
        case DELETE_BUDGET:
            return {initialRoute: 'IntroStack'};
        default:
            return state;
    }
};
