import accountReducer from '../../src/app/accounts/account_reducer';
import {
    GET_ACCOUNTS_FAIL,
    GET_ACCOUNTS_SUCCESS,
    GET_LINKED_ACCOUNTS_SUCCESS,
    LINK_ACCOUNTS,
    RESET_ACCOUNTS_ERROR
} from '../../src/strings/types';

describe('account_reducer', () => {
    let initialState;
    const testError = 'testError';
    beforeEach(() => {
        initialState = {
            accounts: [],
            linkedAccounts: [],
            accountsLoading: false,
            linkLoading: false,
            accountsError: '',
            accountsInitialized: false,
        };
    });

    it('has default state', () => {
        expect(accountReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });

    it('can handle RESET_ACCOUNTS_ERROR', () => {
        const newState = initialState;
        newState.accountsError = testError;
        const resetAction = {
            type: RESET_ACCOUNTS_ERROR
        };
        newstate = accountReducer(newState, resetAction);
        expect(newState).toEqual(initialState)
    });

    it('can handle GET_ACCOUNTS_SUCCESS', () => {
        const getAccountsSuccessAction = {
            type: GET_ACCOUNTS_SUCCESS,
            payload: {
                eBankingAccounts: ['testAccount'],
                linkedAccounts: ['testLinkedAccount']
            }
        };
        expect(accountReducer({}, getAccountsSuccessAction)).toEqual({
                accounts: ['testAccount'],
                linkedAccounts: ['testLinkedAccount'],
                accountsLoading: false,
                accountsInitialized: true
            }
        )
    });

    it('can handle GET_ACCOUNTS_FAIL', () => {
        const getAccountsFailAction = {
            type: GET_ACCOUNTS_FAIL,
            payload: testError
        };
        expect(accountReducer({}, getAccountsFailAction)).toEqual(
            {accountsLoading: false, accountsError: testError}
        )
    });

    it('can handle GET_LINKED_ACCOUNTS_SUCCESS', () => {
        const getLinkedAccountsSuccessAction = {
            type: GET_LINKED_ACCOUNTS_SUCCESS,
            payload: ['linkedAccounts']
        };
        expect(accountReducer({}, getLinkedAccountsSuccessAction)).toEqual(
            {linkedAccounts: ['linkedAccounts'], accountsLoading: false}
        )
    });

    it('can handle LINK_ACCOUNTS', () => {
        const getLinkedAccountsSuccessAction = {
            type: LINK_ACCOUNTS
        };
        expect(accountReducer({}, getLinkedAccountsSuccessAction)).toEqual(
            {linkLoading: true}
        )
    })
});