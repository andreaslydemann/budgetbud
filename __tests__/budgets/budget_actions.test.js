import {
    RESET_BUDGET_ERROR,
    SIGN_IN, CREATE_BUDGET,
    CREATE_BUDGET_SUCCESS,
    CREATE_BUDGET_FAIL,
} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
const middlewares = [thunk];
import {setupFirebaseMock} from "../test_helper/firebase_mock";
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
            {type: CREATE_BUDGET_SUCCESS,
                payload: {
                    income: tmpIncome,
                    totalGoalsAmount: tmpTotalGoalsAmount,
                    disposable: tmpDisposable,
                    budgetID: postResult.data.id
                }}
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

        // jest.mock('axios');
        // const postMock = axios.post;
        // postMock.mockImplementationOnce(() =>
        //     Promise.reject(postResult)
        // );

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
        postMock.mockImplementationOnce(() =>
            Promise.resolve(resp)
        );

        return store.dispatch(await authActions.signIn({cprNumber, code})).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
            expect(firebase.auth).toHaveBeenCalledTimes(1);
            expect(signInWithCustomToken).toHaveBeenCalledWith(testToken);
        });
    })
});
