import {
    RESET_CATEGORIES_ERROR
} from '../../src/strings/types';

const categoryActions = require('../../src/app/categories/category_actions');

describe('reset', () => {
    it('should create an action to reset debt error', () => {
        const expectedAction = {
            type: RESET_CATEGORIES_ERROR
        };
        expect(categoryActions.resetCategoriesError()).toEqual(expectedAction);
    });
});