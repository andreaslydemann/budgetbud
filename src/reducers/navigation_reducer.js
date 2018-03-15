import {
    GET_INITIAL_STATE, SCREEN_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    currentRoute: 'MyBudget'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case SCREEN_CHANGED:
            return {currentRoute: action.payload};
        default:
            return state;
    }
};
