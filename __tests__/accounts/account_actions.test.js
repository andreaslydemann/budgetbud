import {
    GET_ACCOUNTS,
    GET_ACCOUNTS_SUCCESS,
    GET_LINKED_ACCOUNTS,
    GET_LINKED_ACCOUNTS_SUCCESS,
    LINK_ACCOUNTS,
    LINK_ACCOUNTS_SUCCESS,
    RESET_ACCOUNTS_ERROR
} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import {setupFirebaseMock} from "../test_helper/firebase_mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const accountActions = require('../../src/app/accounts/account_actions');

describe('reset', () => {
    it('should create an action to reset account error', () => {
        const expectedAction = {type: RESET_ACCOUNTS_ERROR};
        expect(accountActions.resetAccountsError()).toEqual(expectedAction)
    });
});

describe('getAccounts', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    it('should get accounts and linked account then return them', async () => {
        const eBankingAccounts = {data: ["Acc1", "Acc2"]};
        axios.get.mockResolvedValueOnce(eBankingAccounts);

        const linkedAccounts = {data: ["LinkAcc1", "LinkAcc2"]};
        axios.get.mockResolvedValueOnce(linkedAccounts);

        const store = mockStore({});
        const expectedAction = [
            {type: GET_ACCOUNTS},
            {
                type: GET_ACCOUNTS_SUCCESS,
                payload: {
                    eBankingAccounts: eBankingAccounts.data,
                    linkedAccounts: linkedAccounts.data
                }
            }
        ];

        return store.dispatch(await accountActions.getAccounts()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })
});

describe('getLinkedAccounts', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    it('should get linked accounts then return them', async () => {
        const linkedAccounts = {data: ["LinkAcc1", "LinkAcc2"]};
        axios.get.mockResolvedValueOnce(linkedAccounts);

        const store = mockStore({});
        const expectedAction = [
            {type: GET_LINKED_ACCOUNTS},
            {
                type: GET_LINKED_ACCOUNTS_SUCCESS,
                payload: linkedAccounts.data
            }
        ];

        return store.dispatch(await accountActions.getLinkedAccounts()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })
});

describe('linkAccounts', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    it('should link accounts and envoke callback', async () => {
        const selectedAccounts = ["acc1", "acc2"];
        const postMock = axios.post;
        postMock.mockImplementationOnce(() =>
            Promise.resolve()
        );

        const expectedAction = [
            {type: LINK_ACCOUNTS},
            {type: LINK_ACCOUNTS_SUCCESS}
        ];
        const store = mockStore({});

        const mockCallback = jest.fn();
        return store.dispatch(await accountActions.linkAccounts(
            selectedAccounts, mockCallback)).then(() => {
            expect(postMock).toHaveBeenCalledTimes(1);
            expect(store.getActions()).toEqual(expectedAction)
            expect(mockCallback).toHaveBeenCalled()
        });
    })
});