import {
    PHONE_CHANGED,
    CODE_CHANGED,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_IN,
    SIGN_IN_FAIL, CPR_NUMBER_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    cprNumber: '',
    phone: '',
    code: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CPR_NUMBER_CHANGED:
            return {...state, cprNumber: action.payload};
        case PHONE_CHANGED:
            return {...state, phone: action.payload};
        case CODE_CHANGED:
            return {...state, code: action.payload};
        case SIGN_UP:
            return {...state, ...INITIAL_STATE, error: ''};
        case SIGN_UP_FAIL:
            return {...state, ...INITIAL_STATE, error: 'Sign Up Failed.'};
        case SIGN_IN:
            return {...state, ...INITIAL_STATE, error: ''};
        case SIGN_IN_FAIL:
            return {...state, ...INITIAL_STATE, signInError: 'Sign In Failed.'};
        default:
            return state;
    }
};
