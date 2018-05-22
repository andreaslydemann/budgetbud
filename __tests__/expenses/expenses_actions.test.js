import {
    RESET_EXPENSES_ERROR
} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import firebase from 'firebase';

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