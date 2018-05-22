import {
    CREATE_CATEGORIES, CREATE_CATEGORIES_SUCCESS,
    RESET_CATEGORIES_ERROR
} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
import firebase from 'firebase';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const categoryActions = require('../../src/app/categories/category_actions');

describe('reset', () => {
    it('should create an action to reset category error', () => {
        const expectedAction = {
            type: RESET_CATEGORIES_ERROR
        };
        expect(categoryActions.resetCategoriesError()).toEqual(expectedAction);
    });
});

describe('createCategories', () => {
    it('should create categories and initialize state', async () => {
        const budgetID = 123;
        const categories = [{amount: 123}, {amount: 456}];
        const postResult = {data: {id: 123}};

        const getIdToken = jest.fn(() => {
            return Promise.resolve("TESTTOKEN")
        });

        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return {
                currentUser: {getIdToken}
            }
        });

        const postMock = axios.post;
        postMock.mockImplementationOnce(() =>
            Promise.resolve(postResult)
        );

        const expectedAction = [
            {type: CREATE_CATEGORIES},
            {type: CREATE_CATEGORIES_SUCCESS,
                payload: {
                    categories
                }}
        ];
        const store = mockStore({});

        const mockCallback = jest.fn();
        return store.dispatch(await categoryActions.createCategories(
            budgetID, categories, mockCallback)).then(() => {
            // return of async actions
            // expect(postMock).toHaveBeenCalledTimes(1);
            expect(store.getActions()).toEqual(expectedAction)
            expect(mockCallback).toHaveBeenCalled()
        });
    })
});