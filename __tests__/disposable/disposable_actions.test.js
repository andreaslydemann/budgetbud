import {
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS,
    EDIT_DISPOSABLE,
    EDIT_DISPOSABLE_SUCCESS,
    RESET_DISPOSABLE_ERROR
} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import {setupFirebaseMock} from "../test_helper/firebase_mock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const disposableActions = require('../../src/app/disposable/disposable_actions');

describe('reset', () => {
    it('should create an action to reset disposable error', () => {
        const expectedAction = {
            type: RESET_DISPOSABLE_ERROR
        };
        expect(disposableActions.resetDisposableError()).toEqual(expectedAction)
    });
});

describe('editDisposable', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should edit disposable then return new disposable', async () => {
        const testBudgetID = "123";
        const tmpDisposable = 456;
        const categoryDisposableItems = [{categoryID: "abc", newAmount: 50}];
        axios.post.mockResolvedValueOnce();

        const store = mockStore({});
        const expectedAction = [
            {type: EDIT_DISPOSABLE},
            {
                type: EDIT_DISPOSABLE_SUCCESS,
                payload: tmpDisposable
            }
        ];

        return store.dispatch(await disposableActions.editDisposable({
            budgetID: testBudgetID, categoryDisposableItems, tmpDisposable})).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })
});

describe('calculateDisposableCategoryDifferences', () => {
    beforeEach(() => {
        setupFirebaseMock();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should calculate disposable category differences then return new disposable', async () => {
        const tmpDisposable = 456;
        const disposable = 500;
        const categories = [123, 456];
        const returnedDisposable = {data: 42};
        axios.post.mockResolvedValueOnce(returnedDisposable);

        const store = mockStore({});
        const expectedAction = [
            {type: CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES},
            {
                type: CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS,
                payload: returnedDisposable.data
            }
        ];

        const mockCallback = jest.fn();
        return store.dispatch(await disposableActions.calculateDisposableCategoryDifferences(
            disposable, tmpDisposable, categories, mockCallback)).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })
});