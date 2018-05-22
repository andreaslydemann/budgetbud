import {
    RESET_ACCOUNTS_ERROR
} from '../../src/strings/types';

const accountActions = require('../../src/app/accounts/account_actions');

describe('reset', () => {
    it('should create an action to reset account error', () => {
        const expectedAction = {
            type: RESET_ACCOUNTS_ERROR
        };
        expect(accountActions.resetAccountsError()).toEqual(expectedAction)
    });
});