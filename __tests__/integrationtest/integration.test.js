import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {INITIAL_ACCOUNT_STATE, INITIAL_AUTH_STATE, INITIAL_BUDGET_STATE} from "../test_helper/initial_state";
import {
    CREATE_BUDGET,
    CREATE_BUDGET_SUCCESS,
    EDIT_DISPOSABLE,
    EDIT_DISPOSABLE_SUCCESS,
    GET_EXPENSES_OF_MONTH,
    GET_EXPENSES_OF_MONTH_SUCCESS,
    GET_LINKED_ACCOUNTS,
    GET_LINKED_ACCOUNTS_SUCCESS,
    SIGN_IN
} from "../../src/strings/types";
import firebase from 'firebase';
import axios from "axios";
import store from '../../src/redux/index';
import authReducer from '../../src/app/auth/auth_reducer';
import accountReducer from '../../src/app/accounts/account_reducer';
import CreateBudget from "../../src/app/budgets/CreateBudget";
import SignIn from "../../src/app/auth/SignIn";
import Accounts from "../../src/app/accounts/Accounts";
import {setupFirebaseMock} from "../test_helper/firebase_mock";
import ExpenseOverview from "../../src/app/expenses/ExpenseOverview";
import EditDisposable from "../../src/app/disposable/EditDisposable";

const authActions = require('../../src/app/auth/auth_actions');
const budgetActions = require('../../src/app/budgets/budget_actions');
const accountActions = require('../../src/app/accounts/account_actions');
const expenseActions = require('../../src/app/expenses/expense_actions');
const disposableActions = require('../../src/app/disposable/disposable_actions');

Enzyme.configure({adapter: new Adapter()});
describe('SignIn', () => {
    it('renders SignIn, envoke sign in action, update state and rerender SignIn', async () => {
        // Setup initial screen
        const initialWrapper = shallow(
            <SignIn/>,
            {context: {store}}
        );
        expect(initialWrapper.dive()).toMatchSnapshot();

        const signInWithCustomToken = jest.fn();
        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return {signInWithCustomToken}
        });

        // Fire action
        const testToken = '1234';
        const cprNumber = '1234567890';
        const code = '1234';

        const expectedAction = [
            {type: SIGN_IN}
        ];
        const resp = {data: {token: testToken}};
        axios.post.mockResolvedValue(resp);
        let newState = INITIAL_AUTH_STATE;

        store.dispatch(await authActions.signIn({cprNumber, code})).then(() => {
            newState = authReducer(newState, expectedAction[0]);
            expect(store.getState().auth).toEqual(newState)
            expect(firebase.auth).toHaveBeenCalledTimes(1);
            expect(signInWithCustomToken).toHaveBeenCalledWith(testToken);
        });

        const afterWrapper = shallow(
            <SignIn/>,
            {context: {store}},
        );
        expect(afterWrapper.dive()).toMatchSnapshot();
    });
});

describe('CreateBudget', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders CreateBudget, envoke sign in action, update state and rerender CreateBudget', async () => {
        // Setup initial screen
        const initialWrapper = shallow(
            <CreateBudget/>,
            {context: {store}}
        );
        expect(initialWrapper.dive()).toMatchSnapshot();

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

        let newState = INITIAL_BUDGET_STATE;
        const mockCallback = jest.fn();
        store.dispatch(await budgetActions.createBudget(
            tmpIncome, tmpDisposable, tmpTotalGoalsAmount, mockCallback)).then(() => {
            newState = authReducer(newState, expectedAction[1]);
            expect(store.getState().auth).toEqual(newState);
        });

        const afterWrapper = shallow(
            <CreateBudget/>,
            {context: {store}}
        );
        expect(afterWrapper.dive()).toMatchSnapshot();
    });
});

describe('Accounts', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    it('renders SignIn, envoke sign in action, update state and rerender SignIn', async () => {
        // Setup initial screen
        const initialWrapper = shallow(
            <Accounts/>,
            {context: {store}}
        );
        expect(initialWrapper.dive()).toMatchSnapshot();

        // Fire action
        const expectedAction = [
            {type: GET_LINKED_ACCOUNTS},
            {
                type: GET_LINKED_ACCOUNTS_SUCCESS,
                payload: ["TEST_ACCOUNT"]
            }
        ];

        let newState = INITIAL_ACCOUNT_STATE;
        store.dispatch(await accountActions.getLinkedAccounts()).then(() => {
            newState = accountReducer(newState, expectedAction[1]);
            console.log(store.getState());
            expect(store.getActions()).toEqual(expectedAction);
        });

        const afterWrapper = shallow(
            <Accounts/>,
            {context: {store}},
        );
        expect(afterWrapper.dive()).toMatchSnapshot();
    });
});

describe('ExpenseOverview', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders ExpenseOverview, envoke getExpensesOfMonth action, update state and rerender ExpenseOverview', async () => {
        // Setup initial screen
        const initialWrapper = shallow(
            <ExpenseOverview/>,
            {context: {store}}
        );
        expect(initialWrapper.dive()).toMatchSnapshot();

        // Fire action
        const amountVal = 10;
        const totalAmount = amountVal * 3;
        const returnedExpenses = {
            data: [
                {amount: amountVal},
                {amount: amountVal},
                {amount: amountVal}
            ]
        };
        axios.get.mockResolvedValueOnce(returnedExpenses);

        const expectedAction = [
            {type: GET_EXPENSES_OF_MONTH},
            {
                type: GET_EXPENSES_OF_MONTH_SUCCESS,
                payload: returnedExpenses, totalAmount
            }
        ];

        store.dispatch(await expenseActions.getExpensesOfMonth()).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });

        const afterWrapper = shallow(
            <ExpenseOverview/>,
            {context: {store}},
        );
        expect(afterWrapper.dive()).toMatchSnapshot();
    });
});

describe('EditDisposable', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
    it('renders EditDisposable, envoke editDisposable action, update state and rerender EditDisposable', async () => {
        // Setup initial screen
        const initialWrapper = shallow(
            <EditDisposable/>,
            {context: {store}}
        );
        expect(initialWrapper.dive()).toMatchSnapshot();

        // Fire action
        const testBudgetID = "123";
        const tmpDisposable = 456;
        const categoryDisposableItems = [{categoryID: "abc", newAmount: 50}];
        axios.post.mockResolvedValueOnce();

        const expectedAction = [
            {type: EDIT_DISPOSABLE},
            {
                type: EDIT_DISPOSABLE_SUCCESS,
                payload: tmpDisposable
            }
        ];

        store.dispatch(await disposableActions.editDisposable({
            budgetID: testBudgetID, categoryDisposableItems, tmpDisposable})).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });

        const afterWrapper = shallow(
            <EditDisposable/>,
            {context: {store}},
        );
        expect(afterWrapper.dive()).toMatchSnapshot();
    });
});