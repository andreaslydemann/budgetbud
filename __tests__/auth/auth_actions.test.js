import {
    GET_INITIAL_AUTH_STATE,
    RESET_AUTH_ERROR,
    VALIDATE_CPR_NUMBER_FAIL,
    VALIDATE_PHONE_NUMBER_FAIL,
    SIGN_UP,
    SIGN_IN,
} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import firebase from 'firebase';

const baseURL = "https://us-central1-budgetbud-4950d.cloudfunctions.net";
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
        const url1 = `${baseURL}/createUser`;
        const param1 = {cprNumber};

        const url2 = `${baseURL}/requestCode`;
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
        const signInWithCustomToken = jest.fn()
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
