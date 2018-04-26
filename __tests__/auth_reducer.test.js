import authReducer from '../src/app/auth/auth_reducer';
import {
    GET_INITIAL_STATE,
    GET_INITIAL_AUTH_STATE,
    RESET_AUTH_ERROR,
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
    DELETE_USER_FAIL,
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
} from '../src/strings/types';
import I18n from "../../strings/i18n";

describe('authReducer', () => {

    let initialState;
    beforeEach(() => {
        initialState = {
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
    });

    it('has default state', () => {
        expect(authReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });

    it('can handle RESET_AUTH_ERROR', () => {
        initialState.authError = 'testError';
        const resetAction = {
            type: RESET_AUTH_ERROR
        };
        expect(authReducer(initialState, resetAction)).toEqual(
            {authError: ''}
        )
    });

    it('can handle PHONE_NUMBER_CHANGED', () => {
        const phoneNumberChangedAction = {
            type: PHONE_NUMBER_CHANGED,
            payload: '12345678'
        };
        expect(authReducer({}, phoneNumberChangedAction)).toEqual(
            {authError: '', phoneNumber: '12345678'}
        )
    });

    it('can handle CODE_CHANGED', () => {
        const codeChangedAction = {
            type: CODE_CHANGED,
            payload: '1234'
        };
        expect(authReducer({}, codeChangedAction)).toEqual(
            {authError: '', code: '1234'}
        )
    });

    it('can handle REPEATED_CODE_CHANGED', () => {
        const repeastedCodeChangedAction = {
            type: REPEATED_CODE_CHANGED,
            payload: '1234'
        };
        expect(authReducer({}, repeastedCodeChangedAction)).toEqual(
            {authError: '', code: '1234'}
        )
    })

    it('can handle RESET_AUTH_ERROR', () => {
        initialState.authError = 'testError';
        const resetAction = {
            type: RESET_AUTH_ERROR
        };
        expect(authReducer({}, resetAction)).toEqual(
            {authError: ''}
        )
    })
});