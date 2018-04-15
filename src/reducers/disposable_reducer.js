import {
    DISPOSABLE_CHANGED,
    EDIT_DISPOSABLE,
    EDIT_DISPOSABLE_FAIL,
    EDIT_DISPOSABLE_SUCCESS,
    GET_BUDGET,
    GET_DISPOSABLE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    disposable: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BUDGET:
            return INITIAL_STATE;
        case EDIT_DISPOSABLE:
            return null;
        case EDIT_DISPOSABLE_SUCCESS:
            return null;
        case EDIT_DISPOSABLE_FAIL:
            return null;
        case GET_DISPOSABLE_SUCCESS:
            console.log("GET_DISPOSABLE_SUCCESS")
            console.log(action.payload)
            return {...state, disposable: action.payload};
        case DISPOSABLE_CHANGED:
            let newDisposable = state.disposable + action.payload;
            return {...state, disposable: newDisposable};
        default:
            return state;
    }
};
