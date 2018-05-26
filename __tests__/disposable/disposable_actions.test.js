import {RESET_DISPOSABLE_ERROR} from '../../src/strings/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const baseURL = "https://us-central1-budgetbud-4950d.cloudfunctions.net";
const disposableActions = require('../../src/app/disposable/disposable_actions');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reset', () => {
    it('should create an action to reset disposable error', () => {
        const expectedAction = {
            type: RESET_DISPOSABLE_ERROR
        };
        expect(disposableActions.resetDisposableError()).toEqual(expectedAction)
    });
});