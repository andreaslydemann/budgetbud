import {
    CREATE_DEBT,
    CREATE_DEBT_SUCCESS,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    RESET_DEBT_ERROR
} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import {setupFirebaseMock} from "../test_helper/firebase_mock";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const debtActions = require('../../src/app/debts/debt_actions');

describe('reset', () => {
    it('should create an action to reset debt error', () => {
        const expectedAction = {
            type: RESET_DEBT_ERROR
        };
        expect(debtActions.resetDebtError()).toEqual(expectedAction);
    });
});

describe('getDebts', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should get debts alarms then return them', async () => {
        const testBudgetID = "123";
        const returnedDebts = {data: [123, 456]};
        axios.get.mockResolvedValueOnce(returnedDebts);

        const store = mockStore({});
        const expectedAction = [
            {type: GET_DEBTS},
            {
                type: GET_DEBTS_SUCCESS,
                payload: returnedDebts.data
            }
        ];

        return store.dispatch(await debtActions.getDebts(testBudgetID)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })
});

describe('createDebt', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should get debts alarms then return them', async () => {
        const testBudgetID = "123";
        const returnedDebts = {data: [123, 456]};
        axios.get.mockResolvedValueOnce(returnedDebts);

        const store = mockStore({});
        const expectedAction = [
            {type: CREATE_DEBT},
            {
                type: CREATE_DEBT_SUCCESS,
                payload: returnedDebts.data
            }
        ];

        return store.dispatch(await debtActions.createDebt(testBudgetID)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })
});