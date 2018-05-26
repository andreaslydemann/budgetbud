import {GET_EXPENSES_OF_MONTH, GET_EXPENSES_OF_MONTH_SUCCESS, RESET_EXPENSES_ERROR} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {setupFirebaseMock} from "../test_helper/firebase_mock";
import axios from "axios";

const baseURL = "https://us-central1-budgetbud-4950d.cloudfunctions.net";
const expenseActions = require('../../src/app/expenses/expense_actions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reset', () => {
    it('should create an action to reset expense error', () => {
        const expectedAction = {
            type: RESET_EXPENSES_ERROR
        };
        expect(expenseActions.resetExpensesError()).toEqual(expectedAction)
    });
});

describe('getExpensesOfMonth', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should get expenses of month then return new disposable', async () => {
        const amountVal = 10;
        const totalAmount = amountVal*3;
        const returnedExpenses = {
            data: [
                {amount: amountVal},
                {amount: amountVal},
                {amount: amountVal}
            ]
        };
        axios.get.mockResolvedValueOnce(returnedExpenses);

        const store = mockStore({});
        const expectedAction = [
            {type: GET_EXPENSES_OF_MONTH},
            {
                type: GET_EXPENSES_OF_MONTH_SUCCESS,
                payload: returnedExpenses, totalAmount
            }
        ];

        return store.dispatch(await expenseActions.getExpensesOfMonth()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })
});