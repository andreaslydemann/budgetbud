import {
    GET_INITIAL_AUTH_STATE,
    CPR_NUMBER_CHANGED,
    PHONE_NUMBER_CHANGED,
    CODE_CHANGED,
    VALIDATE_CPR_NUMBER_FAIL,
    VALIDATE_PHONE_NUMBER_FAIL,
    VALIDATE_CODE_FAIL,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_IN,
    SIGN_IN_FAIL,
    DELETE_USER, GET_INITIAL_STATE
} from '../actions/types';

const INITIAL_STATE = {
    cprNumber: '',
    phoneNumber: '',
    code: '',
    error: '',
    authLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case GET_INITIAL_AUTH_STATE:
            return INITIAL_STATE;
        case CPR_NUMBER_CHANGED:
            return {...state, cprNumber: action.payload};
        case PHONE_NUMBER_CHANGED:
            return {...state, phoneNumber: action.payload};
        case CODE_CHANGED:
            return {...state, code: action.payload};
        case VALIDATE_CPR_NUMBER_FAIL:
            return {...state, error: 'CPR-nummer skal være 10 cifre.'};
        case VALIDATE_PHONE_NUMBER_FAIL:
            return {...state, error: 'Telefonnummer skal være 8 cifre.'};
        case VALIDATE_CODE_FAIL:
            return {...state, error: 'Pinkode skal være 4 cifre.'};
        case SIGN_UP:
            return {...state, authLoading: true, error: ''};
        case SIGN_UP_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case SIGN_IN:
            return {...state, authLoading: true, error: ''};
        case SIGN_IN_FAIL:
            return {...state, ...INITIAL_STATE, error: action.payload};
        case DELETE_USER:
            return {...state, authLoading: true};
        default:
            return state;
    }
};
