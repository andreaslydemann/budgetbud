import {
    GET_BUDGET_ID_SUCCESS,
    DELETE_BUDGET_SUCCESS,
    GET_BUDGET_ID_FAIL,
    CREATE_CATEGORIES_SUCCESS
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
        case DELETE_BUDGET_SUCCESS:
            return {initialRoute: 'IntroStack'};
        case CREATE_CATEGORIES_SUCCESS:
            return {initialRoute: 'BudgetStack'};
        default:
            return state;
    }
};