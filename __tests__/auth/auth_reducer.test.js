import authReducer from '../../src/app/auth/auth_reducer';
import {CODE_CHANGED, PHONE_NUMBER_CHANGED, REPEATED_CODE_CHANGED, RESET_AUTH_ERROR} from '../../src/strings/types';

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
            deleteUserLoading: false,
            changeLoading: false,
            phoneNumberInitialized: false
        };
    });

    it('has default state', () => {
        expect(authReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });

    it('can handle RESET_AUTH_ERROR', () => {
        const newState = initialState;
        newState.authError = 'testError';
        const resetAction = {
            type: RESET_AUTH_ERROR
        };
        newstate = authReducer(newState, resetAction);
        expect(newState).toEqual(initialState)
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
            {authError: '', repeatedCode: '1234'}
        )
    })
});