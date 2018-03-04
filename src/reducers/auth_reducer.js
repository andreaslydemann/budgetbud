import {
    AUTH_SCREEN_SWITCHED,
    CPR_NUMBER_CHANGED,
    PHONE_NUMBER_CHANGED,
    CODE_CHANGED,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_IN,
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    cprNumber: '',
    phoneNumber: '',
    code: '',
    error: '',
    loading: false,
    signedUp: false,
    token: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_SCREEN_SWITCHED:
            return INITIAL_STATE;
        case CPR_NUMBER_CHANGED:
            return {...state, cprNumber: action.payload};
        case PHONE_NUMBER_CHANGED:
            return {...state, phoneNumber: action.payload};
        case CODE_CHANGED:
            return {...state, code: action.payload};
        case SIGN_UP:
            return {...state, loading: true, error: ''};
        case SIGN_UP_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case SIGN_UP_SUCCESS:
            return {...INITIAL_STATE, signedUp: true};
        case SIGN_IN:
            return {...state, loading: true, error: ''};
        case SIGN_IN_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload, token: null};
        case SIGN_IN_SUCCESS:
            return {...INITIAL_STATE, token: action.payload};
        default:
            return state;
    }
};
