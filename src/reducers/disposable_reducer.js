import {
    GET_BUDGET
} from '../actions/types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BUDGET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
