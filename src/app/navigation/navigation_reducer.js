import {
    SCREEN_CHANGED,
    GET_INITIAL_AUTH_STATE,
    GET_BUDGET_ID_SUCCESS,
    CREATE_BUDGET_SUCCESS,
    DELETE_BUDGET_SUCCESS, GET_BUDGET_ID_FAIL
} from '../../strings/types';

const INITIAL_STATE = {
    currentRoute: 'MyBudget'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCREEN_CHANGED:
            return {currentRoute: action.payload};
        case GET_INITIAL_AUTH_STATE:
            return INITIAL_STATE;
        case GET_BUDGET_ID_SUCCESS:
            return INITIAL_STATE;
        case GET_BUDGET_ID_FAIL:
            return {...state, currentRoute: 'Intro'};
        case CREATE_BUDGET_SUCCESS:
            return INITIAL_STATE;
        case DELETE_BUDGET_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};
