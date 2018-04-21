import {
    GET_INITIAL_AUTH_STATE,
    RESET_AUTH_ERROR,
    RESET_ACTIVATION_CODE,
    CPR_NUMBER_CHANGED,
    PHONE_NUMBER_CHANGED,
    CODE_CHANGED,
    REPEATED_CODE_CHANGED,
    VALIDATE_CPR_NUMBER_FAIL,
    VALIDATE_PHONE_NUMBER_FAIL,
    VALIDATE_ACTIVATION_CODE_FAIL,
    VALIDATE_CODE_FAIL,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_IN,
    SIGN_IN_FAIL,
    DELETE_USER,
    GET_INITIAL_STATE,
    VALIDATE_CODE_MATCH_FAIL,
    GET_PHONE_NUMBER,
    GET_PHONE_NUMBER_SUCCESS,
    GET_PHONE_NUMBER_FAIL,
    CHANGE_PHONE_NUMBER,
    CHANGE_PHONE_NUMBER_SUCCESS,
    CHANGE_PHONE_NUMBER_FAIL,
    CHANGE_CODE,
    CHANGE_CODE_SUCCESS,
    CHANGE_CODE_FAIL,
    REQUEST_ACTIVATION_CODE_SUCCESS,
    REQUEST_ACTIVATION_CODE_FAIL,
    REQUEST_ACTIVATION_CODE,
    ACTIVATION_CODE_CHANGED,
    VERIFY_ACTIVATION_CODE,
    VERIFY_ACTIVATION_CODE_SUCCESS,
    VERIFY_ACTIVATION_CODE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    cprNumber: '',
    phoneNumber: '',
    code: '',
    repeatedCode: '',
    activationCode: '',
    authError: '',
    authLoading: false,
    changeLoading: false,
    phoneNumberInitialized: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case GET_INITIAL_AUTH_STATE:
            return INITIAL_STATE;
        case RESET_AUTH_ERROR:
            return {...state, authError: ''};
        case RESET_ACTIVATION_CODE:
            return {...state, activationCode: '', changeLoading: '', authError: ''};
        case CPR_NUMBER_CHANGED:
            return {...state, cprNumber: action.payload, authError: ''};
        case PHONE_NUMBER_CHANGED:
            return {...state, phoneNumber: action.payload, authError: ''};
        case CODE_CHANGED:
            return {...state, code: action.payload, authError: ''};
        case REPEATED_CODE_CHANGED:
            return {...state, repeatedCode: action.payload, authError: ''};
        case ACTIVATION_CODE_CHANGED:
            return {...state, activationCode: action.payload, authError: ''};
        case VALIDATE_CPR_NUMBER_FAIL:
            return {...state, authError: 'CPR-nummer skal være 10 cifre.'};
        case VALIDATE_PHONE_NUMBER_FAIL:
            return {...state, authError: 'Telefonnummer skal være 8 cifre.'};
        case VALIDATE_CODE_FAIL:
            return {...state, authError: 'Pinkode skal være 4 cifre.'};
        case VALIDATE_ACTIVATION_CODE_FAIL:
            return {...state, authError: 'Aktiveringskode skal være 4 cifre.'};
        case VALIDATE_CODE_MATCH_FAIL:
            return {...state, authError: 'De indtastede pinkoder er ikke ens.'};
        case SIGN_UP:
            return {...state, authLoading: true, authError: ''};
        case SIGN_UP_FAIL:
            return {...INITIAL_STATE, authError: action.payload};
        case SIGN_IN:
            return {...state, authLoading: true, authError: ''};
        case SIGN_IN_FAIL:
            return {...INITIAL_STATE, authError: action.payload};
        case DELETE_USER:
            return {...state, authLoading: true};
        case REQUEST_ACTIVATION_CODE:
            return {...state, authLoading: true, authError: ''};
        case REQUEST_ACTIVATION_CODE_SUCCESS:
            return {...state, authLoading: false};
        case REQUEST_ACTIVATION_CODE_FAIL:
            return {...state, authLoading: false, authError: action.payload};
        case VERIFY_ACTIVATION_CODE:
            return {...state, authLoading: true, authError: ''};
        case VERIFY_ACTIVATION_CODE_SUCCESS:
            return {...state, authLoading: false};
        case VERIFY_ACTIVATION_CODE_FAIL:
            return {...state, authLoading: false, authError: action.payload};
        case GET_PHONE_NUMBER:
            return {...state, authLoading: true};
        case GET_PHONE_NUMBER_SUCCESS:
            return {
                ...state,
                authLoading: false,
                phoneNumber: action.payload,
                phoneNumberInitialized: true
            };
        case GET_PHONE_NUMBER_FAIL:
            return {...state, authLoading: false, authError: action.payload};
        case CHANGE_PHONE_NUMBER:
            return {...state, changeLoading: true};
        case CHANGE_PHONE_NUMBER_SUCCESS:
            return {...state, changeLoading: false, phoneNumber: ''};
        case CHANGE_PHONE_NUMBER_FAIL:
            return {...state, changeLoading: false, authError: action.payload};
        case CHANGE_CODE:
            return {...state, changeLoading: true, authError: ''};
        case CHANGE_CODE_SUCCESS:
            return {...state, changeLoading: false, code: '', repeatedCode: ''};
        case CHANGE_CODE_FAIL:
            return {...state, changeLoading: false, authError: action.payload};
        default:
            return state;
    }
};
