import {
    GET_BUDGET_ALARMS,
    GET_BUDGET_ALARMS_SUCCESS,
    GET_LINKED_ACCOUNTS,
    GET_LINKED_ACCOUNTS_SUCCESS,
    RESET_ALARMS_ERROR
} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import {setupFirebaseMock} from "../test_helper/firebase_mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const alarmActions = require('../../src/app/alarms/alarm_actions');
const accountActions = require('../../src/app/accounts/account_actions');

describe('reset', () => {
    it('should create an action to reset alarm error', () => {
        const expectedAction = {
            type: RESET_ALARMS_ERROR
        };
        expect(alarmActions.resetAlarmsError()).toEqual(expectedAction);
    });
});

describe('getBudgetAlarms', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should get budget alarms then return them', async () => {
        const testBudgetID = "123";
        const eBankingAccounts = {data: ["test1", "test2"]};

        const store = mockStore({});
        const expectedAction = [
            {type: GET_BUDGET_ALARMS},
            {
                type: GET_BUDGET_ALARMS_SUCCESS,
                payload: eBankingAccounts.data
            }
        ];

        return store.dispatch(await alarmActions.getBudgetAlarms(testBudgetID)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })

    it('should get linked accounts then return them', async () => {
        const linkedAccounts = {data: ["LinkAcc1", "LinkAcc2"]};
        axios.get.mockResolvedValueOnce(linkedAccounts);

        const store = mockStore({});
        const expectedAction = [
            {type: GET_BUDGET_ALARMS},
            {
                type: GET_BUDGET_ALARMS_SUCCESS,
                payload: linkedAccounts.data
            }
        ];

        return store.dispatch(await alarmActions.getBudgetAlarms()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })
});
//TODO
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