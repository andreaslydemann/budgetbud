import {CREATE_BUDGET, CREATE_BUDGET_FAIL, CREATE_BUDGET_SUCCESS, RESET_BUDGET_ERROR,} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import {setupFirebaseMock} from "../test_helper/firebase_mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const budgetActions = require('../../src/app/budgets/budget_actions');

describe('reset', () => {
    it('should create an action to reset budget error', () => {
        const expectedAction = {
            type: RESET_BUDGET_ERROR
        };
        expect(budgetActions.resetBudgetError()).toEqual(expectedAction)
    });
});

describe('createBudget', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should create a budget and initialize state', async () => {
        const tmpIncome = 25;
        const tmpDisposable = 50;
        const tmpTotalGoalsAmount = 80;
        const postResult = {data: {id: 123}};

        const postMock = axios.post;
        postMock.mockImplementation(() =>
            Promise.resolve(postResult)
        );

        const expectedAction = [
            {type: CREATE_BUDGET},
            {
                type: CREATE_BUDGET_SUCCESS,
                payload: {
                    income: tmpIncome,
                    totalGoalsAmount: tmpTotalGoalsAmount,
                    disposable: tmpDisposable,
                    budgetID: postResult.data.id
                }
            }
        ];
        const store = mockStore({});

        const mockCallback = jest.fn();
        return store.dispatch(await budgetActions.createBudget(
            tmpIncome, tmpDisposable, tmpTotalGoalsAmount, mockCallback)).then(() => {
            // return of async actions
            expect(postMock).toHaveBeenCalledTimes(1);
            expect(store.getActions()).toEqual(expectedAction)
            expect(mockCallback).toHaveBeenCalled()
        });
    })

    it('should fail if cpr number is too short', async () => {
        const tmpIncome = 25;
        const tmpDisposable = 50;
        const tmpTotalGoalsAmount = 80;
        const postResult = {data: {id: 123}};

        jest.mock('axios');
        const postMock = axios.post;
        postMock.mockImplementationOnce(() =>
            Promise.reject(postResult)
        );

        const expectedAction = [
            {type: CREATE_BUDGET},
            {type: CREATE_BUDGET_FAIL}
        ];

        const store = mockStore({});
        const mockCallback = jest.fn();
        return store.dispatch(await budgetActions.createBudget(
            tmpIncome, tmpDisposable, tmpTotalGoalsAmount, mockCallback)).then(() => {
            // return of async actions
            // expect(postMock).toHaveBeenCalledTimes(1);
            expect(store.getActions()).toEqual(expectedAction)
        });
    })
});

