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
} from '../../src/strings/types';
import authReducer from '../../src/app/auth/auth_reducer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {BUDGETBUD_FUNCTIONS_URL} from "../../src/config/firebase_config";
import axios from "axios";
import firebase from 'firebase';

const authActions = require('../../src/app/auth/auth_actions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reset', () => {
    it('should create an action to reset auth error', () => {
        const expectedAction = {
            type: RESET_AUTH_ERROR
        };
        expect(authActions.resetAuthError()).toEqual(expectedAction)
    });
});

describe('signUp', () => {
    it('should create a user, request a code and initialize auth state', () => {
        const cprNumber = '9638527410';
        const phoneNumber = '12345678';

        const postMock = axios.post;
        postMock.mockImplementationOnce(() =>
            Promise.resolve({})
        );

        const expectedAction = [
            {type: SIGN_UP},
            {type: GET_INITIAL_AUTH_STATE}
        ];
        const store = mockStore({});
        const url1 = `${BUDGETBUD_FUNCTIONS_URL}/createUser`;
        const param1 = {cprNumber};

        const url2 = `${BUDGETBUD_FUNCTIONS_URL}/requestCode`;
        const param2 = {cprNumber, phoneNumber};

        const mockCallback = jest.fn();
        return store.dispatch(authActions.signUp({cprNumber, phoneNumber}, mockCallback)).then(() => {
            // return of async actions
            expect(postMock).toHaveBeenCalledTimes(2);
            expect(store.getActions()).toEqual(expectedAction)
            expect(mockCallback).toHaveBeenCalled()
            expect(postMock).toHaveBeenCalledWith(url2, param2);
            expect(postMock).toHaveBeenCalledWith(url1, param1);
        });
        // expect(authActions.signUp({cprNumber, phoneNumber}, mockCallback)).toEqual(expectedAction);
    })

    it('should fail if cpr number is too short', () => {
        const cprNumber = '1'; //Too short
        const phoneNumber = '1'; //Too short

        const expectedAction = [
            {type: VALIDATE_CPR_NUMBER_FAIL}
        ];
        const store = mockStore({});

        const mockCallback = jest.fn();
        return store.dispatch(authActions.signUp({cprNumber, phoneNumber}, mockCallback)).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
        });
    })

    it('should fail if phone number is too short', () => {
        const cprNumber = '1234567890'; //Too short
        const phoneNumber = '1'; //Too short

        const expectedAction = [
            {type: VALIDATE_PHONE_NUMBER_FAIL}
        ];
        const store = mockStore({});

        const mockCallback = jest.fn();
        return store.dispatch(authActions.signUp({cprNumber, phoneNumber}, mockCallback)).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
        });
    })
});

describe('signIn', () => {
    it('should sign in with returned token', async () => {
        // adminInitStub = firebase.initializeApp = jest.fn(() => {});
        const signInWithCustomToken = jest.fn()
        const initializeApp = jest
            .spyOn(firebase, 'initializeApp')
            .mockImplementation(() => {
                return {
                    auth: () => {}
                }
            });

        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return {
                signInWithCustomToken
            }
        })

        const testToken = '1234';
        const cprNumber = '1234567890';
        const code = '1234';

        const store = mockStore({});
        const expectedAction = [
            {type: SIGN_IN}
        ];
        const resp = {data: {token: testToken}};
        axios.post.mockResolvedValue(resp);

        return store.dispatch(await authActions.signIn({cprNumber, code})).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
            expect(firebase.auth).toHaveBeenCalledTimes(1);
            expect(signInWithCustomToken).toHaveBeenCalledWith(testToken);
        });
    })
});
