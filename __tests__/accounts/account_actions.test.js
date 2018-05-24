import {
    GET_ACCOUNTS_SUCCESS, GET_LINKED_ACCOUNTS, GET_LINKED_ACCOUNTS_SUCCESS,
    RESET_ACCOUNTS_ERROR
} from '../../src/strings/types';
import axios from 'axios';

const accountActions = require('../../src/app/accounts/account_actions');

describe('reset', () => {
    it('should create an action to reset account error', () => {
        const expectedAction = {
            type: RESET_ACCOUNTS_ERROR
        };
        expect(accountActions.resetAccountsError()).toEqual(expectedAction)
    });
});

describe('getAccounts', () => {
    it('should sign in with returned token', async () => {
        const signInWithCustomToken = jest.fn()
        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return {
                signInWithCustomToken
            }
        })

        const store = mockStore({});
        const expectedAction = [
            {type: GET_LINKED_ACCOUNTS},
            {type: GET_LINKED_ACCOUNTS_SUCCESS}
        ];

        const resp = {data: {token: testToken}};
        axios.get.mockResolvedValue(resp);

        return store.dispatch(await authActions.signIn({cprNumber, code})).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
            expect(firebase.auth).toHaveBeenCalledTimes(1);
            expect(signInWithCustomToken).toHaveBeenCalledWith(testToken);
        });
    })
});